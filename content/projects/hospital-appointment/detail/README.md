# Hospital Appointment System

## Context

The appointment module was built as part of a full-stack hospital management system. Scheduling, patient records, and notifications were separated so each concern could evolve without turning the application into one tightly coupled release.

## Architecture

Spring Boot services expose REST APIs behind JWT authentication and role-based access control. The system separates patient records, scheduling, and notifications, with Docker providing a consistent deployment environment.

## Delivery

GitLab CI/CD and Docker were configured for the deployment pipeline while keeping access to medical data constrained by role.

## What I contributed

I worked on the appointment module, authentication, service boundaries, deployment pipeline, and the architecture decisions needed to keep the system modular and maintainable.
