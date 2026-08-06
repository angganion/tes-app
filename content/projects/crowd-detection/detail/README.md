# Crowd Detection & Analytics Platform

## Context

Dense environments make people counting difficult: detections overlap, identities change between frames, and a useful dashboard must stay understandable while the video is moving. This project focused on the full path from model output to operational analytics.

![Crowd environment reference](/work.jpg)

## System design

The detection pipeline uses a custom-trained YOLOv8 model with OpenCV for video processing. Tracking state is kept across frames so the system can report counts and identities instead of treating every frame as a new scene. A Vue.js dashboard presents the resulting signals as live counts, crowd density, and identity tracking.

## Results

- Uses YOLOv8 and OpenCV for real-time object detection and tracking.
- Fine-tunes the model on a custom crowd dataset for dense environments.
- Integrates facial recognition with a Vue.js dashboard for live analytics.

## Technical decisions

The dashboard is intentionally separate from the vision pipeline. This keeps model experiments independent from the operator interface and makes it easier to replace the model without rewriting the analytics surface.
