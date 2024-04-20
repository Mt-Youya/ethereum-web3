import { Navbar, Welcome, Footer, Table, Map } from "./components"

function App() {

    return (
        <div className="min-h-screen">
            <div className="gradient-bg-welcome">
                <Navbar />
                <Welcome />
            </div>
            <Map />
            <Table />
            <Footer />
        </div>
    )
}

export default App
