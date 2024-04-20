import { useEffect, useState } from "react"

export const LocationContext = createContext()

export default function LocationsProvider({ children }) {
    const [position, setPosition] = useState(null)

    function getLocation() {
        if (navigator.geolocation) {
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
                        reject(error)
                    },
                )
            })
        } else {
            return Promise.reject("Geolocation is not supported by this browser")
        }
    }

    useEffect(() => {
        getLocation().then((pos) => {
            setPosition(pos)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <LocationContext.Provider value={{ position }}>
            {children}
        </LocationContext.Provider>
    )
}
