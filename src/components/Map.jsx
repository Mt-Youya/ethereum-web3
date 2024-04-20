import AMapLoader from "@amap/amap-jsapi-loader"

function Map() {
    const contextRef = useRef(null)

    function getLocation() {
        if (navigator.geolocation) {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 3600000,
            }

            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }
                        resolve(pos)
                    },
                    error => {
                        console.log(error)
                        reject(error)
                    },
                    options,
                )
            })
        }
    }

    useEffect(() => {
        AMapLoader.load({
            key: "b6bba4c9f64ffddf4cabcd1454df975f",
            version: "2.0",
            plugins: ["AMap.Scale"],
        })
            .then(async (AMap) => {
                const pos = await getLocation()
                console.log(pos, "pos")
                contextRef.current = new AMap.Map("container", {
                    // 设置地图容器id
                    viewMode: "3D", // 是否为3D地图模式
                    zoom: 11, // 初始化地图级别
                    center: [pos.lng, pos.lat], // 初始化地图中心点位置
                })
                const marker = new AMap.Marker({
                    position: new AMap.LngLat(pos.lng, pos.lat),
                    title: "上海",
                })
                contextRef.current.add(marker)
            })
            .catch((e) => {
                console.log(e)
            })

        return () => {
            contextRef.current?.destroy()
        }
    }, [])

    return (
        <div
            id="container"
            style={{ height: "800px" }}
        ></div>
    )
}

export default Map
