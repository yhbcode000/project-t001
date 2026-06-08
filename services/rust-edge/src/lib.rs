use axum::{routing::get, Json, Router};
use serde_json::{json, Value};

pub async fn health() -> Json<Value> {
    Json(json!({ "status": "ok", "service": "rust-edge" }))
}

pub async fn hello() -> Json<Value> {
    Json(json!({
        "message": "Hello from Axum / Rust high-performance edge service",
        "runtime": "tokio",
        "framework": "axum"
    }))
}

pub fn app() -> Router {
    Router::new().route("/health", get(health)).route("/hello", get(hello))
}
