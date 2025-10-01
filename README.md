# Node.js File Upload on Kubernetes with Docker and EKS

This repository contains a **Node.js file upload application** using **Express** and **Multer**, deployed on **AWS EKS** with **ALB Ingress**. Docker and GitHub Actions are used for CI/CD.

---

## Features

- Upload images, PDFs, DOCX, and TXT files
- Download uploaded files
- Dockerized Node.js application
- Deployable on AWS EKS with multiple replicas
- Ingress via AWS ALB
- CI/CD via GitHub Actions

---

## Tech Stack

- Node.js 20
- Express.js + Multer
- Docker
- Kubernetes on AWS EKS
- ALB Ingress Controller
- GitHub Actions CI/CD

---

## Setup Node.js Application Locally

### Clone Repository


git clone https://github.com/kikitha13/samplexample.git
cd samplexample
### Install Dependencies
npm install
### Run Application Locally
node index.js
Visit: http://localhost:3000
<img width="1049" height="996" alt="image" src="https://github.com/user-attachments/assets/ad65d93b-d337-4b30-8d7c-1224ea25ce54" />
<img width="989" height="963" alt="image" src="https://github.com/user-attachments/assets/ec023018-c19d-4aa0-9697-6f857db0ca52" />



---
## Docker Steps from Start
### Install Docker

Install Docker on your machine and verify:

docker --version

### Build Docker Image
docker build -t kikitha/node-file-upload:latest .


Tags the image for Docker Hub

Uses the Dockerfile in the current directory
<img width="1247" height="841" alt="image" src="https://github.com/user-attachments/assets/a24263ec-0796-4c6f-88f3-bcd494911d90" />


### Test Docker Image Locally
docker run -p 3000:3000 kikitha/node-file-upload:latest


Maps container port 3000 to local port 3000

Visit http://localhost:3000
 to check the app

### Log in to Docker Hub
docker login


Authenticate with Docker Hub username & password or token

### Push Image to Docker Hub
docker push kikitha/node-file-upload:latest


Uploads your image so Kubernetes or other machines can pull it

### Run Image Anywhere
docker run -p 3000:3000 kikitha/node-file-upload:latest

Works on any system with Docker installed
<img width="1256" height="886" alt="image" src="https://github.com/user-attachments/assets/17e4e177-afa7-4ff4-b8ff-e7e532f9fc3f" />

---
## Prerequisites Check

Make sure these are installed and configured:

aws --version           # Check AWS CLI
eksctl version          # Check eksctl
kubectl version --client # Check kubectl


Explanation:

AWS CLI: manage AWS resources

eksctl: create and manage EKS clusters

kubectl: interact with Kubernetes cluster

### Create EKS Cluster using Auto Mode
eksctl create cluster -f cluster-config.yaml


Explanation:

Creates an EKS cluster named web-quickstart

Auto Mode automatically handles:

Node creation with EC2 instances
<img width="1884" height="714" alt="image" src="https://github.com/user-attachments/assets/dcbfec71-c605-4ce3-847a-5e56c5b6f3cc" />
<img width="1885" height="697" alt="image" src="https://github.com/user-attachments/assets/eb767836-1d61-415a-aa3e-ff462a93b9f7" />


VPC networking
<img width="1871" height="693" alt="image" src="https://github.com/user-attachments/assets/c81c92b9-adc1-46f8-9eee-1ef833d64c2b" />

Load balancing
<img width="1874" height="680" alt="image" src="https://github.com/user-attachments/assets/289cd6f6-ae81-48f7-9a1e-a64fba813f82" />
target group with health checks
<img width="1882" height="684" alt="image" src="https://github.com/user-attachments/assets/011274c3-3baf-4bde-8f3f-9849f44b64f0" />
eks
<img width="1908" height="660" alt="image" src="https://github.com/user-attachments/assets/9fad8be7-b97c-4bf7-8a47-d8cb16d4b783" />
cluster info
<img width="1877" height="685" alt="image" src="https://github.com/user-attachments/assets/0f814d3b-680c-48ec-b53d-4bdb477e9f85" />






### Check nodes:

kubectl get nodes

### Create IngressClass for ALB
kubectl apply -f ingressclass.yaml


Explanation:

Sets up ALB (Application Load Balancer) as the default Ingress controller

Required for exposing services externally

### Verify:

kubectl get ingressclass

### Create Namespace for the Game
kubectl create namespace game-2048 --save-config


### Explanation:

Separates resources for the web

Makes management easier
### Deploy web Application
kubectl apply -n game-2048 -f https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.8.0/docs/examples/2048/2048_full.yaml
<img width="1646" height="874" alt="Screenshot 2025-10-01 151301" src="https://github.com/user-attachments/assets/98594ed9-c3aa-43b2-a9d7-03e6d41c7895" />


### Deployment: 2 replicas of web

Service: exposes pods on port 80

Ingress: routes HTTP traffic via ALB to the service
workload pods
<img width="1889" height="684" alt="image" src="https://github.com/user-attachments/assets/23b7f4f3-e5ae-47bc-a77d-040858549997" />
workloads deployments
<img width="1875" height="700" alt="image" src="https://github.com/user-attachments/assets/f870db23-a148-4053-9767-53280d5300ef" />
cluster node
<img width="1873" height="705" alt="image" src="https://github.com/user-attachments/assets/952196d5-895d-4961-9a07-e235e3dca213" />
cluster API services
<img width="1787" height="628" alt="image" src="https://github.com/user-attachments/assets/be24b651-9162-438e-b00b-a4796d66441b" />
<img width="1881" height="692" alt="image" src="https://github.com/user-attachments/assets/64dd83cc-3fc3-49ea-8c71-cd2bea36ad67" />






### Verify resources:

kubectl get pods -n game-2048
kubectl get svc -n game-2048
kubectl get ingress -n game-2048

### Get the ALB URL
kubectl get ingress -n game-2048


### Explanation:

Copy the ADDRESS field → This is your Application Load Balancer URL

It may take a few minutes for ALB to be provisioned

### Access the Application

Open a browser and navigate to the ALB URL from previous step

Explanation:

You should see the web running

<img width="1702" height="988" alt="Screenshot 2025-10-01 151325" src="https://github.com/user-attachments/assets/642730c3-3671-4f33-a26e-ff4b98b82ddb" />

---
## Conclusion

This project demonstrates deploying a production-ready web application on AWS EKS with Kubernetes best practices, automated infrastructure, and load balancing. Future improvements focus on security, scaling, persistence, and monitoring.
