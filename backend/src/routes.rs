use actix_web::{web, HttpResponse};
use sqlx::sqlite::SqlitePool;

use crate::models::{ApiResponse, Family, Person};

/// Configure routes
pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .route("/health", web::get().to(health))
            .route("/family", web::get().to(get_family))
            .route("/family/person/{id}", web::get().to(get_person)),
    );
}

// ── Health check ────────────────────────────────────────────────────────────

async fn health(pool: web::Data<SqlitePool>) -> HttpResponse {
    match sqlx::query("SELECT 1")
        .fetch_one(pool.as_ref())
        .await
    {
        Ok(_) => HttpResponse::Ok().json(ApiResponse::<()>::ok(())),
        Err(_) => HttpResponse::ServiceUnavailable().json(ApiResponse::<()>::err("Database unavailable")),
    }
}

// ── Get full family tree ────────────────────────────────────────────────────

async fn get_family(pool: web::Data<SqlitePool>) -> HttpResponse {
    let rows = sqlx::query_as::<_, Person>("SELECT * FROM persons")
        .fetch_all(pool.as_ref())
        .await;

    match rows {
        Ok(people) => {
            // Split into parents and children based on role
            let parents: Vec<Person> = people
                .iter()
                .filter(|p| matches!(p.role.as_str(), "Dad" | "Mom" | "Father" | "Mother"))
                .cloned()
                .collect();

            let children: Vec<Person> = people
                .iter()
                .filter(|p| !matches!(p.role.as_str(), "Dad" | "Mom" | "Father" | "Mother"))
                .cloned()
                .collect();

            let family = Family { parents, children };
            HttpResponse::Ok().json(ApiResponse::ok(family))
        }
        Err(e) => HttpResponse::InternalServerError().json(ApiResponse::<Family>::err(e.to_string())),
    }
}

// ── Get single person ───────────────────────────────────────────────────────

async fn get_person(pool: web::Data<SqlitePool>, path: web::Path<String>) -> HttpResponse {
    let person_id = path.into_inner();

    let result = sqlx::query_as::<_, Person>("SELECT * FROM persons WHERE id = ?")
        .bind(&person_id)
        .fetch_optional(pool.as_ref())
        .await;

    match result {
        Ok(Some(person)) => HttpResponse::Ok().json(ApiResponse::ok(person)),
        Ok(None) => HttpResponse::NotFound().json(ApiResponse::<Person>::err(format!(
            "Person with id '{}' not found",
            person_id
        ))),
        Err(e) => HttpResponse::InternalServerError().json(ApiResponse::<Person>::err(e.to_string())),
    }
}
