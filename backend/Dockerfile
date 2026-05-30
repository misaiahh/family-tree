# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM rust:1.96-slim AS builder

# Install build dependencies (SQLite dev headers)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libsqlite3-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Cargo manifest and build dependencies first (layer caching)
COPY Cargo.toml ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release 2>&1 && cargo clean

# Copy source and build
COPY src ./src
RUN cargo build --release

# ── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM debian:bookworm-slim

# Install SQLite runtime + CA certs + gosu (for privilege dropping)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libsqlite3-0=3.40.1-2+deb12u2 \
    ca-certificates=20230311+deb12u1 \
    gosu=1.14-1+b10 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the compiled binary
COPY --from=builder /app/target/release/family-tree-backend .

# Create a dedicated non-root user for the application
RUN addgroup --system family && adduser --system --no-create-home --ingroup family family

# Expose the API port
EXPOSE 8080

# Environment variables (with defaults for local dev)
ENV DATABASE_URL=/data/family_tree.db
ENV HOST=0.0.0.0
ENV PORT=8080

# Entrypoint: run as root only to fix volume ownership, then drop to 'family' user
# 'exec gosu' replaces the shell — no root process persists after this point
ENTRYPOINT ["sh", "-c", "mkdir -p /data && chown -R family:family /data && exec gosu family ./family-tree-backend"]
