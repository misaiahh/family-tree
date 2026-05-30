use sqlx::sqlite::{SqliteConnectOptions, SqlitePool};
use std::str::FromStr;

/// Initialize the database: create tables and seed data if empty.
pub async fn init_db(database_url: &str) -> SqlitePool {
    // Create the connection pool — must enable create_if_missing for SQLite
    let options = SqliteConnectOptions::from_str(database_url)
        .expect("Invalid DATABASE_URL")
        .create_if_missing(true);

    let pool = SqlitePool::connect_with(options)
        .await
        .expect("Failed to connect to database");

    // Create the persons table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS persons (
            id         TEXT PRIMARY KEY,
            name       TEXT NOT NULL,
            role       TEXT NOT NULL,
            birth_year INTEGER,
            death_year TEXT,
            photo      TEXT,
            bio        TEXT,
            notes      TEXT
        )
        "#,
    )
    .execute(&pool)
    .await
    .expect("Failed to create persons table");

    // Seed data if the table is empty
    let count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM persons")
        .fetch_one(&pool)
        .await
        .expect("Failed to count persons");

    if count == 0 {
        let seed = super::models::seed_people();
        for person in &seed {
            sqlx::query(
                r#"
                INSERT OR IGNORE INTO persons (id, name, role, birth_year, death_year, photo, bio, notes)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                "#,
            )
            .bind(&person.id)
            .bind(&person.name)
            .bind(&person.role)
            .bind(person.birth_year)
            .bind(&person.death_year)
            .bind(&person.photo)
            .bind(&person.bio)
            .bind(&person.notes)
            .execute(&pool)
            .await
            .expect("Failed to seed person");
        }
        log::info!("Seeded {} persons into the database", seed.len());
    }

    pool
}
