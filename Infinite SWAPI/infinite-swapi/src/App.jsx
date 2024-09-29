import "./App.css";
import {InfinitePeople} from "./people/InfinitePeople";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <h1>Infinite SWAPI</h1>
                <InfinitePeople/>
                {/* <InfiniteSpecies /> */}

                <ReactQueryDevtools/>
            </div>
        </QueryClientProvider>
    );
}

export default App;