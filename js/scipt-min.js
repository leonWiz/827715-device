var link = document.querySelector(".write-us-btn")
  , popup = document.querySelector(".modal-write-us")
  , popup_close = popup.querySelector(".modal-close")
  , form = popup.querySelector(".form-write-us")
  , nickname = popup.querySelector("[name=name]")
  , email = popup.querySelector("[name=email]")
  , letter = popup.querySelector("[name=letter]")
  , map_link = document.querySelector(".map")
  , map_modal = document.querySelector(".modal-map")
  , map_close = map_modal.querySelector(".modal-close")
  , storage_name = localStorage.getItem("name")
  , storage_email = localStorage.getItem("email");
link.addEventListener("click", function(a) {
    a.preventDefault(),
    popup.classList.add("modal-show"),
    storage_name ? (nickname.value = storage_name,
    storage_email ? (email.value = storage_email,
    letter.focus()) : email.focus()) : nickname.focus()
}),
popup_close.addEventListener("click", function(a) {
    a.preventDefault(),
    popup.classList.remove("modal-show"),
    popup.classList.remove("modal-error")
}),
window.addEventListener("keydown", function(a) {
    27 === a.keyCode && (popup.classList.contains("modal-show") && (popup.classList.remove("modal-show"),
    popup.classList.remove("modal-error")),
    map_modal.classList.contains("modal-show") && map_modal.classList.remove("modal-show"))
}),
form.addEventListener("submit", function(a) {
    nickname.value && email.value && letter.value ? (localStorage.setItem("name", nickname.value),
    localStorage.setItem("email", email.value)) : (a.preventDefault(),
    popup.classList.remove("modal-error"),
    popup.offsetWidth = popup.offsetWidth,
    popup.classList.add("modal-error"))
}),
map_link.addEventListener("click", function(a) {
    a.preventDefault(),
    map_modal.classList.add("modal-show")
}),
map_close.addEventListener("click", function(a) {
    a.preventDefault(),
    map_modal.classList.remove("modal-show")
}),
function(a, b) {
    var c = {
        _modules: {},
        require: function(a, b) {
            function g(e) {
                return function(f) {
                    d[e] = f,
                    ++c == a.length && b.apply(null, d)
                }
            }
            a = [].concat.call([], a);
            for (var c = 0, d = [], e = 0, f = a.length; f > e; e++)
                this._modules[a[e]] && this._modules[a[e]](g(e));
            return this
        },
        define: function(a, b, c) {
            function f(a) {
                function i(a) {
                    return function(c) {
                        f[a] = c,
                        ++g === b.length && j()
                    }
                }
                function j() {
                    c.apply(null, [function(b) {
                        a(e = b)
                    }
                    ].concat(f))
                }
                var f = []
                  , g = 0;
                if (b.length)
                    for (var h = 0; h < b.length; h++)
                        d.require(b[h], i(h));
                else
                    j()
            }
            var e, d = this;
            return b = [].concat.call([], b),
            this._modules[a] = function(a) {
                e ? a(e) : f(a)
            }
            ,
            this
        }
    };
    c.define("main", ["map-data", "params"], function(a, b, d) {
        function h() {
            var a = document.createElement("ymaps");
            return a.setAttribute("id", "ymaps" + d.tid),
            a.style.display = "block",
            a.style.width = d.containerSize[0],
            a.style.height = d.containerSize[1],
            a
        }
        function i(a) {
            for (; a; ) {
                if (a.parentNode === document.body)
                    return !0;
                a = a.parentNode
            }
            return !1
        }
        function j(a) {
            console && console.error && console.error(a)
        }
        if (b.maps && b.maps.length && d.testUrl) {
            for (var f, e = document.getElementsByTagName("script"), g = e.length - 1; g > -1; g--)
                if (f = e[g],
                -1 !== f.src.indexOf(d.testUrl) && !f.ctorInited) {
                    f.ctorInited = !0;
                    break
                }
            f && c.require(["ymaps", "create-map"], function(a, b) {
                var c, e = h();
                if (d.elementId) {
                    if (c = document.getElementById(d.elementId),
                    !c)
                        return void j("DOMElement #" + d.elementId + " not found.");
                    c.appendChild(e)
                } else {
                    if (!document.documentElement.contains(f))
                        return void j("Script element was removed from document.");
                    i(f) ? f.parentNode.insertBefore(e, f) : document.body.appendChild(e)
                }
                b(e),
                f.parentNode && f.parentNode.removeChild(f)
            }),
            a({})
        }
    }),
    c.define("config", [], function(a) {
        a(b.config)
    }),
    c.define("map-data", [], function(b) {
        b(a)
    }),
    c.define("params", ["config", "map-data"], function(a, c, d) {
        function g(a) {
            return a ? isNaN(Number(a)) ? a : a + "px" : "100%"
        }
        var e = b.params
          , f = c.originalUrl.match(/\/\/(.+)$/);
        e.testUrl = f && f[1],
        e.containerSize = [g(e.size[0]), g(e.size[1])],
        e.isEnterprise = c.originalUrl.indexOf("//enterprise") > -1,
        e.lang = (e.lang || d.maps[0] && d.maps[0].state && d.maps[0].state.lang || "ru_RU").replace("-", "_"),
        e.tid = String(Number(new Date)) + String(Math.round(1e6 * Math.random())),
        e.ns = [c.namespace, e.lang, e.key.replace(/\W/g, ""), e.apikey.replace(/\W/g, ""), e.isEnterprise ? "_ntrp" : ""].join("__"),
        a(e)
    }),
    c.define("ie-version", [], function(a) {
        a(function() {
            for (var a, b = 3, c = document.createElement("div"), d = c.getElementsByTagName("i"); c.innerHTML = "<!--[if gt IE " + ++b + "]><i></i><![endif]-->",
            d[0]; )
                ;
            return b > 4 ? b : a
        }())
    }),
    c.define("js-loader", [], function(a) {
        a(function(a, b) {
            var c = document.getElementsByTagName("head")[0]
              , d = document.createElement("script")
              , e = function() {
                b && (b(),
                c.removeChild(d)),
                b = null
            };
            return d.charset = "utf-8",
            d.src = a,
            c.insertBefore(d, c.firstChild),
            d.onreadystatechange = function() {
                ("complete" == this.readyState || "loaded" == this.readyState) && e()
            }
            ,
            d.onload = e,
            d.src = a,
            d
        })
    }),
    c.define("ymaps", ["config", "params", "js-loader"], function(a, b, c, d) {
        function l() {
            a(window[e])
        }
        var e = c.ns
          , f = window[e]
          , g = e + "loader";
        if (f && !window[g])
            f.ready(l);
        else if (window[g])
            window[g].queue.push(l);
        else {
            var h = "fid" + c.tid
              , i = b.host;
            "file:" === window.location.protocol && "/" === i.indexOf(0) && (i = "https:" + i);
            var j = i + b.apiVersion + "/"
              , k = ["Map", "GeoObject", "geoObject.addon.balloon", "map.associate.serviceGeoObjects", "geoObject.addon.hint", "templateLayoutFactory", "domEvent.manager", "control.Button", "control.FullscreenControl", "control.GeolocationControl", "control.RouteEditor", "control.RulerControl", "control.SearchControl", "control.TrafficControl", "control.TypeSelector", "control.ZoomControl", "system.browser", "meta", "mapType.storage", "option.presetStorage"]
              , j = [j, "?lang=", c.lang, "&coordorder=longlat&load=", k.join(","), "&wizard=constructor&ns=", c.ns].join("");
            c.key && (j += "&key=" + c.key),
            c.apikey && (j += "&apikey=" + c.apikey),
            d(j + "&onload=" + h),
            window[h] = function(a) {
                a.ready(function() {
                    function a() {
                        var a = window[g];
                        try {
                            delete window[h],
                            delete window[g]
                        } catch (b) {
                            window[h] = window[g] = null
                        }
                        for (var c = 0, d = a.queue.length; d > c; c++)
                            a.queue[c]()
                    }
                    a()
                })
            }
            ,
            window[g] = {
                queue: [l],
                callback: window[h]
            }
        }
    }),
    c.define("check-size-component", ["config", "params", "distribution"], function(a, b, c, d) {
        var e;
        a(function(a) {
            function c() {
                for (var f = document.documentElement, g = a.container.isFullscreen() ? [f.clientWidth, f.clientHeight] : a.container.getSize(), h = b.minContainerSize, i = "0,0" == g.toString(), j = g[0] < h[0], k = !i && (j || g[1] < h[1]), l = ["rulerControl", "routeEditor", "searchControl", "trafficControl", "geolocationControl"], m = 0, n = l.length; n > m; m++)
                    a.controls.get(l[m]).options.set("visible", !k);
                (a.state.get("narrowMode") || !a.options.get("suppressMapOpenBlock", !1)) && (a.state.get("narrowMode") !== j ? j ? d.show(a) : d.hide(a) : j && d.onResize(a)),
                a.state.get("compactMode") !== k && (k ? (a.controls.remove("typeSelector"),
                a.controls.get("zoomControl").options.set({
                    position: {
                        top: 10,
                        left: 10
                    },
                    size: "small"
                })) : (a.controls.add("typeSelector"),
                a.controls.get("zoomControl").options.unset(["position", "size"]))),
                i ? e || (e = window.setInterval(c, 200)) : e && (window.clearInterval(e),
                e = 0),
                a.state.set({
                    compactMode: k,
                    narrowMode: j
                })
            }
            a.container.events.add(["fullscreenenter", "fullscreenexit"], c),
            window.attachEvent ? window.attachEvent("onresize", c) : window.addEventListener("resize", c),
            c()
        })
    }),
    c.define("create-map", ["config", "params", "map-data", "check-size-component", "ymaps"], function(a, b, c, d, e, f) {
        var g = d.maps[0];
        a(function(a) {
            function r(a) {
                if (a.indexOf("___sport") > -1) {
                    var b = a.split("___");
                    return ["islands#", b[1], "Run", b[0].indexOf("circle") > -1 ? "CircleIcon" : "Icon"].join("")
                }
                return "#" === a[0] ? c.sid + "" + a : a.replace(/^twirl#/, "islands#").replace(/^default#/, "islands#").replace(/Dot$/, "Icon").replace("white", "gray")
            }
            var b = f.templateLayoutFactory.createClass("{{ properties.iconContent }}", {
                build: function() {
                    b.superclass.build.call(this);
                    var a = this.getData().properties.get("iconContent");
                    if (a && String(a).length > 2) {
                        var c = this.getElement();
                        c.style.fontSize = "9px",
                        c.style.lineHeight = "16px",
                        c.style.display = "block"
                    }
                }
            })
              , h = {
                autoFitToViewport: "always",
                geoObjectStrokeOpacity: 1,
                geoObjectFillOpacity: 1,
                geoObjectStrokeColor: "ff0000e6",
                geoObjectStrokeWidth: 5,
                geoObjectFillColor: "ff000099",
                geoObjectBalloonContentLayout: f.templateLayoutFactory.createClass("{{ properties.name|raw }}"),
                geoObjectIconContentLayout: b,
                geoObjectZIndexActive: Math.pow(10, 9) + 10,
                geoObjectZIndexHover: Math.pow(10, 9) + 9
            };
            c.isEnterprise || (h.searchControlProvider = "yandex#search");
            var i = new f.Map(a,{
                center: g.state.center,
                zoom: Math.round(g.state.zoom),
                type: g.state.type,
                controls: ["fullscreenControl", "rulerControl", "routeEditor", "searchControl", "trafficControl", "typeSelector", "zoomControl", "geolocationControl"]
            },h);
            e(i),
            i.state.set({
                mapSid: g.properties.sid,
                mapSourceType: c.sourceType
            }),
            c.scrollZoomBehavior || i.behaviors.disable("scrollZoom");
            var j = d.presetStorage;
            for (var k in j)
                j.hasOwnProperty(k) && f.option.presetStorage.add(k, j[k]);
            g.state.traffic && g.state.traffic.shown && i.controls.get("trafficControl").state.set("trafficShown", !0);
            for (var l = g.geoObjects.features, m = f.map.associate.serviceGeoObjects.get(i), n = 0, o = l.length; o > n; n++) {
                var q, p = l[n];
                p.options && (q = r(p.options.preset || "")),
                m.add(new f.GeoObject({
                    geometry: p.geometry,
                    properties: p.properties
                },{
                    preset: q,
                    zIndex: p.options && p.options.zIndex || n + 1
                }))
            }
        })
    }),
    c.define("distribution", ["config", "params", "ymaps", "ymaps-counter", "ie-version"], function(a, b, c, d, e, f) {
        function n(a) {
            function b(a) {
                var b = a.getElement();
                b && b.firstChild && b.parentNode && (b.firstChild.style.width = "100%",
                b.firstChild.firstChild && (b.firstChild.firstChild.style.padding = "0px"))
            }
            m = "cnst_" + +new Date,
            l = new d.control.Button({
                data: {
                    content: '<ymaps style="display: block; text-align:center;"><ymaps class="' + m + '" style="' + j + '">' + h + "</ymaps></ymaps>"
                },
                options: {
                    maxWidth: "99999",
                    selectOnClick: !1
                }
            }),
            a.controls.add(l, {
                position: {
                    left: 10,
                    right: 10,
                    bottom: 5
                }
            }),
            l.getLayoutSync() ? b(l.getLayoutSync()) : l.getLayout().then(b),
            a.panes.get("copyrights").getElement().style.marginBottom = "29px",
            o(a)
        }
        function o(a) {
            function b(b) {
                var c = b.getElement().querySelector("." + m)
                  , d = a.container.getSize();
                d[0] < 175 ? (c.style.paddingLeft = "0px",
                c.style.backgroundImage = null) : (c.style.paddingLeft = "18px",
                c.style.backgroundImage = "url(" + i + ")")
            }
            9 > f || l && (l.getLayoutSync() ? b(l.getLayoutSync()) : l.getLayout().then(b))
        }
        function p(a) {
            a.controls.remove("fullscreenControl")
        }
        function q(a) {
            a.controls.add("fullscreenControl")
        }
        var g = {
            ru_RU: "\u041d\u0430 \u0431\u043e\u043b\u044c\u0448\u0443\u044e \u043a\u0430\u0440\u0442\u0443",
            en_US: "See full-size map",
            ru_UA: "\u041d\u0430 \u0431\u043e\u043b\u044c\u0448\u0443\u044e \u043a\u0430\u0440\u0442\u0443",
            uk_UA: "\u041d\u0430 \u0432\u0435\u043b\u0438\u043a\u0443 \u043a\u0430\u0440\u0442\u0443",
            tr_TR: "Haritalar'da a\xe7"
        }
          , h = g[c.lang] || g.ru_RU
          , i = ["data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAxNCAyMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtLjUgLS4yMjIpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik01LjUgMjMuMjIybDUuNTM1LTcuNTdzMS42LTIuMTg1IDIuNjEtNC4xNWMxLjAxLTEuOTY2Ljg0NS00LjI4Ljg0NS00LjI4TDggMTMuMiA1LjUgMjMuMjJ6IiBmaWxsPSIjQ0QwMDAwIi8+PGNpcmNsZSBmaWxsPSIjRTAwIiBjeD0iNy41IiBjeT0iNy4yMjIiIHI9IjciLz48ZWxsaXBzZSBmaWxsPSIjRkZGIiBjeD0iNy41IiBjeT0iNy4yMjIiIHJ4PSIzIiByeT0iMyIvPjwvZz48L3N2Zz4="].join("")
          , j = "background-size: 10px 16px; background-repeat: no-repeat; background-position: left center;display: inline-block;";
        9 > f && (j = "");
        var k, l, m;
        a({
            show: function(a) {
                function f(a) {
                    e.countByKey("distribution", [a, d.system.browser.platform, d.meta.version.replace(/\W/g, "_")].join("."))
                }
                a.options.set({
                    copyrightLogoVisible: !1,
                    suppressMapOpenBlock: !0
                }),
                n(a),
                p(a),
                l.events.add("click", function() {
                    window.open([b.mapHost, "?um=", c.sourceType, ":", c.sid, "&source=constructor"].join("")),
                    f("mapsButton-constructor.smallMap")
                })
            },
            onResize: function(a) {
                o(a)
            },
            hide: function(a) {
                l && a.controls.remove(l),
                q(a),
                a.panes.get("copyrights").getElement().style.marginBottom = "0px",
                a.options.unset(["copyrightLogoVisible", "suppressMapOpenBlock"]),
                k && (k.removeAll(),
                k = null)
            }
        })
    }),
    c.define("ymaps-counter", ["ymaps"], function(a, b) {
        var c;
        a({
            countByKey: function(a, d) {
                c ? c.then(function(b) {
                    b.countByKey(a, d)
                }) : c = b.modules.require("yandex.counter").then(function(b) {
                    var c = b[0];
                    return c.countByKey(a, d),
                    c
                })
            }
        })
    }),
    c.require("main", function() {})
}({
    ymj: "1.0",
    maps: [{
        properties: {
            sid: "RDUQfAdTpPxf2D-3Zi5kxJBx49zXnQ6N",
            authorUid: "45900345",
            updated: 1473385e3,
            created: 1472197045,
            favourite: 0,
            access: "public",
            name: "device-map",
            description: ""
        },
        state: {
            center: [37.53213918936342, 55.68725814973584],
            zoom: 15,
            size: [960, 560],
            lang: "",
            type: "yandex#map",
            traffic: {
                shown: !1
            }
        },
        geoObjects: {
            type: "FeatureCollection",
            features: [{
                type: "Feature",
                properties: {
                    name: "\u0420\u043e\u0441\u0441\u0438\u044f, \u041c\u043e\u0441\u043a\u0432\u0430, \u0443\u043b\u0438\u0446\u0430 \u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u0435\u0439, 15",
                    description: ""
                },
                geometry: {
                    type: "Point",
                    coordinates: [37.529654, 55.68698]
                },
                options: {
                    preset: "islands#redDotIcon"
                }
            }]
        }
    }]
}, {
    config: {
        host: "https://api-maps.yandex.ru/",
        originalUrl: "https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=RDUQfAdTpPxf2D-3Zi5kxJBx49zXnQ6N&width=960&height=560&id=yandex-map&lang=ru_RU&sourceType=constructor&scroll=true",
        namespace: "ymaps_ctor",
        apiVersion: "2.1.41",
        minContainerSize: [320, 200],
        mapHost: "https://yandex.ru/maps/"
    },
    params: {
        scrollZoomBehavior: !0,
        size: ["960", "560"],
        sid: "RDUQfAdTpPxf2D-3Zi5kxJBx49zXnQ6N",
        elementId: "yandex-map",
        lang: "ru_RU",
        sourceType: "constructor",
        key: "",
        apikey: "",
        buttonType: 3
    }
});
