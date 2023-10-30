function authCheck(token, expireDate, setter, redirection) {
    if (token && expireDate) {
        const now = new Date();
        if (Date.parse(expireDate) > Date.parse(now)) {
            localStorage.setItem("AuthStatus", true);
            setter(true);
            redirection("/");
        }
    } else {
        localStorage.setItem("AuthStatus", false);
        setter(false);
        localStorage.setItem("TOKEN", "");
        localStorage.setItem("EXPIRE", "");
        localStorage.setItem("CompaniesUsed", "");
        localStorage.setItem("CompaniesLimit", "");
        redirection("/error");
    }
}

function authTime(token, determineDate, setter) {
    if (token && determineDate) {
        const now = new Date();
        if (Date.parse(determineDate) > Date.parse(now)) {
            localStorage.setItem("AuthStatus", true);
            setter(true);
        }
    } else {
        localStorage.setItem("AuthStatus", false);
        setter(false);
        localStorage.setItem("TOKEN", "");
        localStorage.setItem("EXPIRE", "");
    }
}

function authReboot(setter, redirection) {
    localStorage.setItem("TOKEN", "");
    localStorage.setItem("EXPIRE", "");
    localStorage.setItem("AuthStatus", false);
    localStorage.setItem("CompaniesUsed", "");
    localStorage.setItem("CompaniesLimit", "");
    setter(false);
    console.log("Logged out...");
    redirection("/");
}

export { authTime, authCheck, authReboot };
