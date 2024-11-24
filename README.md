# Collaborative To-Do Application (Advanced)

This practice builds upon the basic version of the collaborative To-Do application. You'll implement additional features and configurations to improve the robustness, scalability, and performance of the application.

---

## **Project Overview**

You will deploy a full-stack application consisting of the following components:

1. **Frontend**: A React-based user interface.
2. **Backend**: A Flask-based API for managing tasks.
3. **Database**: PostgreSQL to store tasks persistently.
4. **Cache**: Redis for caching frequently accessed tasks.

---

## **Objectives**

By completing this practice, you will learn how to:

1. **Containerize** applications using **Docker**.
2. Deploy applications on **Kubernetes** using **Deployments**.
3. Use **environment variables** for dynamic configuration in deployments.
4. Add **readiness** and **liveness probes** to your Kubernetes deployments.
5. Implement features like **pagination**, **search**, and **error handling**.
6. Test application health and simulate failure scenarios.

---

## **Task Instructions**

### **1. Containerize the Application**

1. Write `Dockerfile` for each component (`frontend`, `backend`, `postgres`, and `redis`).
2. Build Docker images for each component.
3. Ensure the application works locally using `docker-compose` (optional).

---

### **2. Write Kubernetes Deployments**

1. Create Kubernetes deployments for the following:
   - **Frontend**: Deploy the React application.
   - **Backend**: Deploy the Flask API.
   - **Database**: Deploy PostgreSQL.
   - **Cache**: Deploy Redis.

2. **Use Environment Variables**:
   - Configure environment variables for the database and cache in the backend deployment. These should include:
     - `POSTGRES_USER`: Database username.
     - `POSTGRES_PASSWORD`: Database password.
     - `POSTGRES_DB`: Database name.
     - `REDIS_HOST`: Redis hostname.

---

### **3. Add Probes to Deployments**

**Readiness and Liveness Probes** must be added to monitor the health of your pods:

1. **Frontend**:
   - **Readiness Probe**: HTTP GET request to `/` on port `3000`.
   - **Liveness Probe**: HTTP GET request to `/` on port `3000`.

2. **Backend**:
   - **Readiness Probe**: HTTP GET request to `/health` on port `5000`.
   - **Liveness Probe**: HTTP GET request to `/health` on port `5000`.

3. **PostgreSQL**:
   - Use the `pg_isready` command for both readiness and liveness probes.

4. **Redis**:
   - Use the `redis-cli ping` command for both readiness and liveness probes.

---

### **4. Add Features**

1. **Frontend**:
   - Add pagination to fetch and display tasks in chunks.
   - Include a search bar to filter tasks by their titles.
   - Handle API errors gracefully and display error messages to the user.

2. **Backend**:
   - Extend the `/api/tasks` endpoint to:
     - Support pagination (`?page=1&size=10`).
     - Allow filtering tasks by title (`?search=query`).

---

### **5. Test the Application**

1. **Verify Probes**:
   - Simulate failures and observe Kubernetes restarting unhealthy pods.
   - Temporarily block a service and confirm Kubernetes removes it from traffic routing until it recovers.

2. **Logs**:
   - Use `kubectl logs` to view logs from each pod and debug any issues.

3. **Pod Communication**:
   - Use `kubectl exec` to test connectivity between pods.

---

## **Challenges**

1. **Simulate Failures**:
   - Introduce random failures (e.g., terminate the backend process) and validate Kubernetes recovery using probes.

2. **Optimize Probes**:
   - Adjust the `initialDelaySeconds` and `periodSeconds` for better performance.

3. **Implement Horizontal Pod Autoscaling (HPA)**:
   - Scale your frontend and backend deployments dynamically based on CPU or memory usage.

---

## **Resources**

- [Kubernetes Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- [Docker Documentation](https://docs.docker.com/)
- [Redis Documentation](https://redis.io/docs/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://reactjs.org/docs/)

---

Good luck and happy learning! 🚀
