function FsnAdtmplt(A, t) {
    // WeakMap 폴리필(Polyfill) 및 리스너 저장소
    // 구형 WebView는 WeakMap을 지원하지 않으므로, DOM 요소에 직접 ID를 부여하여 리스너를 관리하는 방식으로 대체합니다.
    var _fsnIdCounter = 0;
    var _fsnListenerMap = {};

    function D(b) {
        if (a.x_view_type == "1") {
            u(f, false, true, function() { return b; });
        }
    }

    function E(b, e, d) {
        b.crossOrigin = "anonymous";
        b.src = e;
        b.onload = function() {
            if (d) {
                var h = void 0;
                try {
                    var l = document.createElement("canvas"),
                        n = l.getContext("2d");
                    l.width = 50;
                    l.height = 50;
                    n.drawImage(b, 0, 0, 50, 50);
                    var m = n.getImageData(0, 0, 50, 50).data;
                    l = {};
                    n = [];
                    var c, k;
                    for (c = 0; c < 50; c++) {
                        k = 4 * (c + 0);
                        n.push([m[k], m[k + 1], m[k + 2]]);
                    }
                    for (c = 0; c < 50; c++) {
                        k = 4 * (c + 2450);
                        n.push([m[k], m[k + 1], m[k + 2]]);
                    }
                    for (c = 0; c < 50; c++) {
                        k = 200 * c;
                        n.push([m[k], m[k + 1], m[k + 2]]);
                    }
                    for (c = 0; c < 50; c++) {
                        k = 4 * (49 + 50 * c);
                        n.push([m[k], m[k + 1], m[k + 2]]);
                    }

                    // for...of 및 구조 분해 할당을 일반 for 루프로 변경
                    for (var i = 0; i < n.length; i++) {
                        var item = n[i];
                        var q = item[0], F = item[1], G = item[2];
                        // 템플릿 리터럴을 문자열 합치기로 변경
                        var g = (10 * Math.round(q / 10)) + "," + (10 * Math.round(F / 10)) + "," + (10 * Math.round(G / 10));
                        if (!l[g]) {
                            l[g] = 0;
                        }
                        l[g]++;
                    }

                    m = 0;
                    g = [0, 0, 0];
                    // for...in 루프에서 const 제거
                    for (var q_key in l) {
                        if (l[q_key] > m) {
                            m = l[q_key];
                            g = q_key.split(",").map(Number);
                        }
                    }

                    var r = H(g[0], g[1], g[2]);
                    // startsWith를 indexOf로 변경
                    if (r.indexOf("#") === 0 && r.length == 7) {
                        h = r;
                    }
                } catch (q) {
                    console.error("배경색 추출 중 오류 발생:", q);
                }
                d(h);
            }
        };
        b.onerror = function() {
            b.onerror = null;
            b.remove();
            console.error("이미지를 로드할 수 없습니다:", e);
        };
    }

    function u(b, e, d, h) {
        // WeakMap 대신 ID 기반 객체 조회로 리스너 관리
        if (b._fsnId && _fsnListenerMap[b._fsnId]) {
            var l = _fsnListenerMap[b._fsnId];
            // Object.entries 및 화살표 함수를 for...in 루프로 변경
            for (var eventName in l) {
                if (l.hasOwnProperty(eventName)) {
                    b.removeEventListener(eventName, l[eventName]);
                }
            }
        }
        l = {};
        
        // 화살표 함수를 일반 함수로 변경
        var n = function(c) {
            c.stopPropagation();
            c.preventDefault();
        };
        var m = function(c) {
            c.stopPropagation();
            c.preventDefault();
            if (e) {
                if (!h || h(c) !== false) {
                    try {
                        window.android.closePopup();
                    } catch (k) {
                        try {
                            window.android.dismiss();
                        } catch (g) {
                            window.close();
                        }
                    }
                }
            } else {
                if (!h || (d && t && a.block_sec > 0)) return;
                c = h(c);
                if (c != void 0 && c != null && c.length > 0) {
                    // startsWith를 indexOf로 변경
                    if (c.indexOf("{{") === 0) {
                        console.error("href 변환 안됨", b, c);
                    } else if (a.clk_type === "1") {
                        window.open(c);
                    } else {
                        window.location.href = c;
                    }
                }
            }
        };

        if (a.t_event == "1") {
            b.addEventListener("touchstart", n);
            b.addEventListener("touchmove", n);
            b.addEventListener("touchend", m);
            l.touchstart = n;
            l.touchmove = n;
            l.touchend = m;
        } else {
            b.addEventListener("click", m);
            l.click = m;
        }

        // WeakMap 대신 ID 기반 객체 저장으로 리스너 관리
        var id = b._fsnId || (b._fsnId = ++_fsnIdCounter);
        _fsnListenerMap[id] = l;
    }

    function p(b, e, d) {
        var val = (new URL(w)).searchParams.get(b);
        if (val == void 0 || val == null || val === "") {
            return e;
        }
        val = val.trim();
        return (d != void 0 && d != null && d.length > 0 && !d.includes(val)) ? e : val;
    }

    function H(b, e, d) {
        // 화살표 함수를 일반 함수로 변경
        return "#" + [b, e, d].map(function(h) {
            h = Math.max(0, Math.min(255, h)).toString(16);
            return h.length === 1 ? "0" + h : h;
        }).join("");
    }

    function B(b, e) {
        try {
            var d = window.android;
            if (d !== void 0 && d !== null) {
                if (typeof d[b] !== "function") {
                    // 템플릿 리터럴을 문자열 합치기로 변경
                    throw Error("SDK 에 " + b + " 함수가 존재하지 않습니다.");
                }
                if (e !== void 0 && e !== null) {
                    d[b](e);
                } else {
                    d[b]();
                }
            } else {
                throw Error("SDK 객체가 존재하지 않습니다. (call: " + b + ")");
            }
        } catch (h) {
            console.error("SDK API 호출 오류:", h);
        }
    }

    function C() {
        var b = !t || !(window && window.innerWidth > 0) || y;
        return a.x_view_type == "1" ? b || document.visibilityState !== "visible" : b;
    }

    if (t == void 0 || t == null) {
        t = true;
    }
    var w = void 0,
        f = void 0,
        y = false,
        v = { onOpen: void 0, onClose: void 0 },
        z = { original: {}, processed: {} };
    
    // const를 var로 변경
    var a = {
        t_event: "2", clk_type: "1", cauly_x_button: "0",
        x_view_type: "0", x_type: "1", x_position: "r",
        x_wh: -1, x_timer: -1, x_aftershow: -1,
        x_mirror: "0", block_sec: -1
    };

    this.addFsnEventListener = function(b, e, d, h) { u(b, e, d, h); };
    this.getUrlParam = function(b, e, d) { return p(b, e, d); };
    this.xShow = function(b) {
        if (b) {
            if (!f.classList.contains("show")) f.classList.add("show");
            t = true;
        } else {
            if (f.classList.contains("show")) f.classList.remove("show");
            t = false;
        }
    };
    this.imgLoad = function(b, e, d) { E(b, e, d); };
    this.xBackgroundClickUrl = function(b) { D(b); };
    this.setOpenDialogFunc = function(b, e) {
        if (b != void 0 && b != null && typeof b === "function") v.onOpen = b;
        if (e != void 0 && e != null && typeof e === "function") v.onClose = e;
    };
    this.debug = function() { console.log("ORG_PARAMS", z); };

    // 즉시 실행 함수 및 스코프 유지
    (function() {
        w = location.href;
        if (location && location.pathname == "/CaulyImpressTemplate") {
            w = p("rt_template_path", null, null);
        }
        a.t_event = p("t_event", a.t_event, ["1", "2"]);
        a.clk_type = p("clk_type", a.clk_type, ["1", "2"]);
        a.cauly_x_button = p("cauly_x_button", a.cauly_x_button, ["1", "0"]);
        a.x_view_type = p("x_view_type", a.x_view_type, ["0", "1"]);
        
        // padStart를 호환 가능한 코드로 변경
        var temp_x_type = p("x_type", a.x_type, ["1", "2", "3"]);
        a.x_type = temp_x_type.length < 2 ? "0" + temp_x_type : temp_x_type;

        a.x_position = p("x_position", a.x_position, ["l", "r", "L", "R"]).toLowerCase();
        try {
            a.x_wh = +p("x_wh", a.x_view_type == "1" ? 8 : a.x_wh, null);
            if (isNaN(a.x_wh)) a.x_wh = a.x_view_type == "1" ? 8 : 0;
        } catch (g) {
            a.x_wh = a.x_view_type == "1" ? 8 : 0;
        }
        try {
            a.x_timer = +p("x_timer", a.x_view_type == "1" ? 6 : a.x_timer, null);
            if (isNaN(a.x_timer)) a.x_timer = a.x_view_type == "1" ? 6 : 0;
        } catch (g) {
            a.x_timer = a.x_view_type == "1" ? 6 : 0;
        }
        if (a.x_view_type == "1") {
            try {
                a.x_aftershow = +p("x_aftershow", a.x_aftershow, null);
                if (isNaN(a.x_aftershow)) a.x_aftershow = 0;
            } catch (g) {
                a.x_aftershow = 0;
            }
            a.x_mirror = p("x_mirror", a.x_mirror, ["1", "0"]);
        }
        try {
            a.block_sec = +p("block_sec", a.block_sec, null);
            if (isNaN(a.block_sec)) a.block_sec = 0;
        } catch (g) {
            a.block_sec = 0;
        }

        // 객체 전개 구문을 수동 복사로 변경
        var processed_clone = {};
        for(var key in a) {
            if (Object.prototype.hasOwnProperty.call(a, key)) {
                 processed_clone[key] = a[key];
            }
        }
        z = { original: {}, processed: processed_clone };
        
        // for...of 및 구조 분해 할당을 호환 가능한 코드로 변경 (디버깅용이라 기능 영향 적음)
        try {
            var b_params = (new URL(w)).searchParams;
            b_params.forEach(function(value, key) {
                z.original[key] = value;
            });
        } catch (g) {}

        var b = document.querySelector("body");
        if(location && location.protocol == "http:") {
            b.classList.add("fsn_adtmplt_http");
        } else {
            b.classList.add("fsn_adtmplt_https");
        }
        if (b) {
            var e = document.createElement("div");
            e.className = "fsn_adtmplt_close default-size";
            b.insertBefore(e, b.firstChild);
        }
        f = document.querySelector(".fsn_adtmplt_close");
        var d, h, l, n, e_close;
        if (a.x_view_type == "1") {
            f.classList.remove("fsn_adtmplt_close");
            f.classList.add("fsn_adtmplt_close_reward");
            f.innerHTML = '<div class="close_label"><span>0</span>초 남음</div>\n<div class="close">\n    <div class="ico_close"></div>\n</div>';
            f.insertAdjacentHTML("afterend", '<div class="fsn_adtmplt_reward_dialog">\n    <div>\n        <div class="dialog_content">\n            <p class="dialog_title">광고를 닫으시겠습니까?</p>\n            <p class="dialog_message">리워드를 잃게 됩니다.</p>\n            <div class="dialog_actions">\n                <button class="close_btn">닫기</button>\n                <button class="continue_btn">계속</button>\n            </div>\n        </div>\n    </div>\n</div>');
            d = f.querySelector(".close_label");
            b = d.querySelector("span");
            h = f.querySelector(".close");
            l = document.querySelector(".fsn_adtmplt_reward_dialog");
            e_close = l.querySelector(".close_btn");
            n = l.querySelector(".continue_btn");
        }
        if (a.cauly_x_button == "1" && t) {
            f.classList.add("show");
        } else {
            f.classList.remove("show");
        }

        if (a.block_sec > 0) {
            var m = setInterval(function() {
                if (!C()) {
                    if (a.block_sec > 0) a.block_sec--;
                    if (a.block_sec <= 0) {
                        a.block_sec = 0;
                        clearInterval(m);
                        m = null;
                    }
                }
            }, 1000);
        }

        document.querySelectorAll("a").forEach(function(g) {
            var r = g.getAttribute("href");
            u(g, false, true, function() { return r; });
        });

        if (a.cauly_x_button == "1") {
            f.classList.add(a.x_position == "l" ? "x_position_left" : "x_position_right");
            f.classList.add("close_" + a.x_type);

            if (a.x_wh > 0) {
                if (a.x_view_type == "1") {
                    f.style.height = a.x_wh + "vw";
                    h.style.width = f.style.height;
                    h.style.height = f.style.height;
                    d.style.fontSize = a.x_wh / 2 + "vw";
                    var c = a.x_wh * window.innerWidth / 100 / 2;
                    f.style.borderRadius = +c + "px";
                    d.style.paddingLeft = +c + "px";
                    d.style.paddingRight = (a.x_aftershow > 0 || a.x_mirror == "1") ? +c + "px" : +(c / 2) + "px";
                } else {
                    f.classList.remove("default-size");
                    f.style.width = a.x_wh + "vw";
                    f.style.height = a.x_wh + "vw";
                    f.style.fontSize = a.x_wh / 2 + "vw";
                }
            }

            if (a.x_aftershow > 0) h.style.display = "none";
            if (a.x_mirror == "1") h.classList.add("x_mirror");

            var k = null;
            var timerFunc = function(g, r) {
                if (a.x_timer <= 0) {
                    r();
                } else {
                    g.textContent = a.x_timer.toString();
                    k = setInterval(function() {
                        if (!C()) {
                            var q = parseInt(g.textContent, 10) - 1;
                            if (q <= 0) {
                                a.x_timer = 0;
                                r();
                            } else {
                                a.x_timer = q;
                                g.textContent = q.toString();
                            }
                        }
                    }, 1000);
                }
            };

            if (a.x_view_type == "1") {
                u(h, true, false, function() {
                    if (a.x_timer > 0) {
                        l.classList.add("show");
                        if (v.onOpen) v.onOpen();
                        y = true;
                        return false;
                    }
                });
                u(e_close, true, false, function() {
                    B("fireCloseXButtonPressed", null);
                });
                u(n, false, false, function() {
                    l.classList.remove("show");
                    if (v.onClose) v.onClose();
                    y = false;
                });

                timerFunc(b, function() {
                    B("onUserRewarded", "");
                    d.innerHTML = "리워드 지급됨";
                    if (k != null) {
                        clearInterval(k);
                        k = null;
                    }
                    if (a.x_aftershow > 0 && h.style.display == "none") {
                        setTimeout(function() {
                            if (a.x_mirror == "0") {
                                d.style.paddingRight = (+(d.style.paddingRight.replace(/px/g, "")) / 2) + "px";
                            }
                            h.style.removeProperty("display");
                        }, 1000 * a.x_aftershow);
                    }
                });
            } else {
                timerFunc(f, function() {
                    f.innerHTML = "";
                    f.style.fontSize = "";
                    var g = document.createElement("div");
                    g.className = "ico_close_" + a.x_type;
                    f.appendChild(g);
                    if (k != null) {
                        clearInterval(k);
                        k = null;
                    }
                    u(f, true, false, null);
                });
            }
        }
        if (A) A(this);
    }).call(this);
}
