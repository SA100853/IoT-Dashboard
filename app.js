let token = "";

/* ⭐ CREATE STARS */
function createStars() {
    const container = document.getElementById("stars");

    for (let i = 0; i < 120; i++) {
        let star = document.createElement("div");
        star.className = "star";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.setProperty("--twinkle", (2 + Math.random() * 3) + "s");
        star.style.setProperty("--float", (20 + Math.random() * 20) + "s");

        let size = Math.random() * 3 + 1;
        star.style.width = size + "px";
        star.style.height = size + "px";

        container.appendChild(star);
    }
}

window.onload = createStars;

/* ✅ API URL (IMPORTANT) */
const API_URL = "https://your-app.onrender.com";

/* ✅ SIGNUP */
async function signup() {
    try {
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Enter username and password");
            return;
        }

        let res = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        let data = await res.json();
        alert(data.message);

    } catch (err) {
        console.error(err);
        alert("Signup error");
    }
}

/* ✅ LOGIN */
async function login() {
    try {
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Enter username and password");
            return;
        }

        let res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        let data = await res.json();
        alert(data.message);

        if (data.message === "Login Successful") {
            window.location.href = "dashboard.html";
        }

    } catch (err) {
        console.error(err);
        alert("Login error");
    }
}

/* LOGOUT */
function logout() {
    location.reload();
}

/* PROJECT */
function addProject() {
    let name = document.getElementById("projectName").value;

    let div = document.createElement("div");
    div.className = "project";
    div.innerText = name;

    document.getElementById("projects").appendChild(div);
}

/* MQTT */
let client;

function connectMQTT() {
    let host = document.getElementById("host").value;
    let port = document.getElementById("port").value;
    let user = document.getElementById("mqttUser").value;
    let pass = document.getElementById("mqttPass").value;

    client = mqtt.connect(`wss://${host}:${port}/mqtt`, {
        username: user,
        password: pass
    });

    client.on("connect", () => alert("MQTT Connected"));
}
function openSignup() {
    window.location.href = "signup.html";
}
