import { Navbar, Welcome, Footer, Table, Map } from "./components"
import LocationsProvider from "./context/LocationsContext"

function App() {

    return (
        <div className="min-h-screen">
            <LocationsProvider>
                <div className="gradient-bg-welcome">
                    <Welcome />
                </div>
                <Map />
                <Table />
            </LocationsProvider>
            <Footer />
        </div>
    )
}

export default App
