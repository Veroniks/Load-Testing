# Load Testing with k6: Spring PetClinic

## Description
This repository is a Pet Project designed to demonstrate and practice load testing skills using k6 by Grafana Labs. 
It focuses on simulating realistic scenarios for a web application, [Spring PetClinic](https://github.com/spring-projects/spring-petclinic), and includes test cases for both performance validation and monitoring.

## Test Cases
* **Login** *[Validate the login page's ability to handle concurrent users]*
* **Search Functionality Test** *[Simulate multiple users searching for an owner by last name]*
* **Create New Pet Test** *[Test the performance of creating a new pet record by several users at the same time with valid data]*
* **Concurrent Visit Scheduling** *[Simulate multiple users scheduling visits for their pets concurrently]*
*
*
*

## Metrics
* **Response Time**: Average, 90th/95th percentile, and max.
* **Throughput**: Requests per second (RPS).
* **Error Rate**: Percentage of failed requests.
* **System Latency**: Time taken by the system to respond.

## Enter/Exit criteria

## Monitoring tools
TBD

---

## Setup
* **Install K6**: `brew install k6` (macOS).
* **Set up monitoring integrations** (e.g., Grafana and Prometheus) if needed.

## Run tests
`k6 run script.js`