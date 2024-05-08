import './Home.css'


function Home() {
  return (
    <div>
      <div className="home-inner">
        <div className="home-info-block">
          <h3>Docker links</h3>
          <ul className="home-useful-links">
            <li title="Docker Guides"><a href="https://docs.docker.com/guides/">Docker Guides</a></li>
            <li title="Docker Get Started Guide"><a href="https://docs.docker.com/get-started/">Docker Get Started</a></li>
            <li title="Portainer Documentation"><a href="https://docs.portainer.io/">Portainer Documentation</a></li>
            <li title="Docker Hub"><a href="https://hub.docker.com/">Docker Hub</a></li>
            <li title="Docker Swarm Documentation"><a href="https://docs.docker.com/swarm/">Docker Swarm Documentation</a></li>
            <li title="Docker Compose Documentation"><a href="https://docs.docker.com/compose/">Docker Compose Documentation</a></li>
            <li title="Docker Desktop Documentation"><a href="https://docs.docker.com/desktop/">Docker Desktop Documentation</a></li>
            <li title="Docker Engine Documentation"><a href="https://docs.docker.com/engine/">Docker Engine Documentation</a></li>
            <li title="Docker Security Documentation"><a href="https://docs.docker.com/engine/security/">Docker Security Documentation</a></li>
            <li title="Docker API Documentation"><a href="https://docs.docker.com/engine/api/">Docker API Documentation</a></li>
          </ul>
        </div>

        <div className="home-info-block">
          <h3>Kubernetes links</h3>
          <ul className="home-useful-links">
            <li title="Kubernetes Documentation"><a href="https://kubernetes.io/docs/">Kubernetes Documentation</a></li>
            <li title="Kubernetes Basics"><a href="https://kubernetes.io/docs/tutorials/kubernetes-basics/">Kubernetes Basics</a></li>
            <li title="Kubernetes API Reference"><a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/">Kubernetes API Reference</a></li>
            <li title="Kubernetes Dashboard"><a href="https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/">Kubernetes Dashboard</a></li>
            <li title="Minikube Documentation"><a href="https://minikube.sigs.k8s.io/docs/">Minikube Documentation</a></li>
            <li title="Kubernetes GitHub Repository"><a href="https://github.com/kubernetes/kubernetes">Kubernetes GitHub Repository</a></li>
            <li title="Kubernetes Operators"><a href="https://kubernetes.io/docs/concepts/extend-kubernetes/operator/">Kubernetes Operators</a></li>
            <li title="Kubernetes Security Best Practices"><a href="https://kubernetes.io/docs/concepts/security/security-best-practices/">Kubernetes Security Best Practices</a></li>
            <li title="Kubernetes Community"><a href="https://kubernetes.io/community/">Kubernetes Community</a></li>
            <li title="Kubernetes Training"><a href="https://kubernetes.io/training/">Kubernetes Training</a></li>
          </ul>
        </div>

        <div className="home-info-block">
          <h3>Useful links</h3>
          <ul className="home-useful-links">
            <li title="FastAPI Documentation"><a href="https://fastapi.tiangolo.com/">FastAPI Documentation</a></li>
            <li title="React.js Documentation"><a href="https://reactjs.org/docs/getting-started.html">React.js Documentation</a></li>
            <li title="Python Documentation"><a href="https://docs.python.org/3/">Python Documentation</a></li>
            <li title="JavaScript Documentation"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript Documentation</a></li>
          </ul>
        </div>


      </div>
    </div>
  );
}

export default Home;
