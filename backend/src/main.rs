mod db;
mod models;
mod routes;

use actix_web::{middleware::Logger, web, App, HttpServer};
use db::init_db;
use std::env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    // Initialize the database (creates tables + seed data if empty)
    let database_url = env::var("DATABASE_URL")
        .unwrap_or_else(|_| "family_tree.db".to_string());
    let pool = init_db(&database_url).await;

    let host = env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
    let port = env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let bind = format!("{}:{}", host, port);

    log::info!("Starting server on http://{}", bind);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .configure(routes::config)
            .wrap(Logger::default())
    })
    .bind(&bind)?
    .run()
    .await
}
