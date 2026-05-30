use serde::{Deserialize, Serialize};
use sqlx::FromRow;

// ── Person ──────────────────────────────────────────────────────────────────

#[derive(Debug, Clone, FromRow, Serialize, Deserialize)]
pub struct Person {
    pub id: String,
    pub name: String,
    pub role: String,
    pub birth_year: Option<i32>,
    pub death_year: Option<String>,
    pub photo: Option<String>,
    pub bio: Option<String>,
    pub notes: Option<String>,
}

// ── Family ──────────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Family {
    pub parents: Vec<Person>,
    pub children: Vec<Person>,
}

// ── API Response wrappers ───────────────────────────────────────────────────

#[derive(Debug, Serialize, Deserialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<T>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<String>,
}

impl<T> ApiResponse<T> {
    pub fn ok(data: T) -> Self {
        Self {
            success: true,
            data: Some(data),
            error: None,
        }
    }

    pub fn err(msg: impl Into<String>) -> Self {
        Self {
            success: false,
            data: None,
            error: Some(msg.into()),
        }
    }
}

// ── Seed data for initial database population ───────────────────────────────

pub fn seed_people() -> Vec<Person> {
    vec![
        Person {
            id: "micky".to_string(),
            name: "Micky".to_string(),
            role: "Dad".to_string(),
            birth_year: Some(1985),
            death_year: None,
            photo: None,
            bio: None,
            notes: None,
        },
        Person {
            id: "jen".to_string(),
            name: "Jen".to_string(),
            role: "Mom".to_string(),
            birth_year: Some(1987),
            death_year: None,
            photo: None,
            bio: None,
            notes: None,
        },
        Person {
            id: "olivia".to_string(),
            name: "Olivia".to_string(),
            role: "Daughter".to_string(),
            birth_year: Some(2010),
            death_year: None,
            photo: None,
            bio: None,
            notes: None,
        },
        Person {
            id: "olenna".to_string(),
            name: "Olenna".to_string(),
            role: "Daughter".to_string(),
            birth_year: Some(2012),
            death_year: None,
            photo: None,
            bio: None,
            notes: None,
        },
    ]
}
