import { Navbar, Welcome, Footer, Services, Transactions, Table } from "./components"

function App() {
    return (
        <div className="min-h-screen">
            <div className="gradient-bg-welcome">
                <Navbar />
                <Welcome />
            </div>
            <Services />
            <Table />
            <Transactions />
            <Footer />
        </div>
    )
}

export default App
