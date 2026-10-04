FROM postgres:16-alpine

LABEL maintainer="Enterprise Digital Solutions Directorate"
LABEL project="NexusMEAL Enterprise MIS"

# Copy initialization script with schema and seed mock data
COPY init.sql /docker-entrypoint-initdb.d/init.sql

ENV POSTGRES_USER=meal_admin
ENV POSTGRES_PASSWORD=MealSecure@2026
ENV POSTGRES_DB=rayee_meal_db

EXPOSE 5432
