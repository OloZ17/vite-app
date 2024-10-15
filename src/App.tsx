import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { fetchWrapper } from '@/utils/utils'

function App() {
    interface People {
        name: string
        height: string
        mass: string
        hair_color: string
        skin_color: string
        eye_color: string
        gender: string
        homeworld: string
        films: string[]
        species: string[]
        vehicles: string[]
        starships: string[]
    }
    const [count, setCount] = useState(0)
    const [data, setData] = useState<People | null>(null)

    useEffect(() => {
        /**
         * Fetches data from the SWAPI API.
         *
         * @param {string} url The URL to fetch.
         * @returns {Promise<Person>} The fetched data.
         */
        const fetchData = async (url: string): Promise<void> => {
            const response = (await fetchWrapper(url)) as People
            setData(response)
        }

        fetchData('https://swapi.dev/api/people/1')
    }, [])

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1 className="text-4xl">Vite + React</h1>
            <Card>
                {data && <div className="api-data">{JSON.stringify(data)}</div>}
                <Button
                    variant={'outline'}
                    size={'lg'}
                    onClick={() => setCount((count) => count + 1)}
                >
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </Card>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
