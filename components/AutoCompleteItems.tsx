import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import axiosInstance from "@/lib/axios"

interface Item {
  id: string
  description: string
  unit: string
  unitPrice: number
}

interface Props {
  value: string
  onChange: (value: string) => void
  onSelect: (item: Item) => void
}

export function AutocompleteInput({ value, onChange, onSelect }: Props) {
  const [query, setQuery] = useState(value)
  const [results, setResults] = useState<Item[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isManuallyEditing, setIsManuallyEditing] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length < 2 || !isManuallyEditing) return

      setLoading(true)

      axiosInstance
        .get(`/items`, { params: { query } })
        .then((res) => {
          setResults(res.data)
          setShowDropdown(true)
        })
        .catch((err) => console.error("Autocomplete fetch error", err))
        .finally(() => setLoading(false))
    }, 300)

    return () => clearTimeout(timeout)
  }, [query, isManuallyEditing])

  const handleSelect = (item: Item) => {
    setQuery(item.description)
    onSelect(item)
    setShowDropdown(false)
    setIsManuallyEditing(false) // 🛑 prevent more searches
  }

  return (
    <div className="relative">
      <Input
        placeholder="Item description"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          onChange(e.target.value)
          setIsManuallyEditing(true) // 🟢 enable searching
        }}
        onFocus={() => {
          if (results.length > 0) setShowDropdown(true)
        }}
        onBlur={() => setShowDropdown(false)}
      />

      {showDropdown && results.length > 0 && (
        <div className="absolute z-10 w-full max-h-64 overflow-auto rounded-md border bg-white shadow-md text-sm">
          {results.map((item) => (
            <div
              key={item._id}
              onMouseDown={(e) => {
                e.preventDefault()
                handleSelect(item)
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {item.description}
            </div>
          ))}
        </div>
      )}

      {loading && <p className="text-xs text-gray-400 mt-1">Searching...</p>}
    </div>
  )
}
