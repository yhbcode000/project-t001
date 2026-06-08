use axum::{routing::get, Json, Router};
use serde_json::{json, Value};

async fn health() -> Json<Value> {
    Json(json!({ "status": "ok", "service": "rust-edge" }))
}

async fn hello() -> Json<Value> {
    Json(json!({
        "message": "Hello from Axum / Rust high-performance edge service",
        "runtime": "tokio",
        "framework": "axum"
    }))
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/health", get(health)).route("/hello", get(hello));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8081").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
