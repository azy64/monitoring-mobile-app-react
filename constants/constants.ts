const SERVER_IP ="192.168.1.93";
//const SERVER_IP="10.0.2.2";
const CONSTANTS={
    BASE_URL:`http://${SERVER_IP}:8000/`,
    BASE_URL_USERS:`http://${SERVER_IP}:8000/users/`,
    AUTH_LOGIN:`http://${SERVER_IP}:8000/auth/login`,
    STORE_NAME:"user-monitoring",
    AGENT_URL:"users/agent",
    AROUND_URL:"users/around",
    CONTROL_POINT_URL:"users/control-point",
    CHECK_POINT_URL:"users/check-point",
    SHIFT_URL:"users/shift",
}

export default CONSTANTS;