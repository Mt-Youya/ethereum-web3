import AMapLoader from "@amap/amap-jsapi-loader"
import Loader from "./Loader"

function Map() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
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
                        setError(null)
                        setLoading(false)
                    },
                    error => {
                        setError(error)
                        setLoading(false)
                        reject(error)
                    },
                    options,
                )
            })
        }
    }

    async function init() {
        try {
            const position = await getLocation()
            const params = {
                key: "b6bba4c9f64ffddf4cabcd1454df975f",
                version: "2.0",
                plugins: ["AMap.Scale"],
            }
            const AMap = await AMapLoader.load(params)
            contextRef.current = new AMap.Map("container", {
                viewMode: "3D",
                zoom: 11,
                center: [position.lng, position.lat],
            })
            const marker = new AMap.Marker({
                position: new AMap.LngLat(position.lng, position.lat),
                title: "上海",
            })
            contextRef.current.add(marker)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        init()
        return () => contextRef.current?.destroy()
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {error ? (
                <div className="text-center my-5">
                    <h1>Failed to get geographic location longitude and latitude</h1>
                    <p>{error.message}</p>
                    <p>errorCode:{error.code}</p>
                </div>
            ) : <div id="container" style={{ height: "400px" }}></div>}
        </div>
    )
}

export default Map
