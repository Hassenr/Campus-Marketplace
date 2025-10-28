'use client'
import { useState } from 'react'
// Simple component definitions
const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`border rounded-lg shadow ${className}`}>
        {children}
    </div>
    )

const Input = ({ type, placeholder, value, onChange, className = '' }: { 
    type: string, 
    placeholder?: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string 
}) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border rounded px-4 py-2 w-full ${className}`}
    />
)

const Button = ({ children, variant = 'default', onClick, disabled = false }: {
    children: React.ReactNode,
    variant?: 'default' | 'outline',
    onClick?: () => void,
    disabled?: boolean
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded ${
            variant === 'default' 
                ? 'bg-blue-500 text-white' 
                : 'border border-gray-300'
        } ${disabled ? 'opacity-50' : ''}`}
    >
        {children}
    </button>
)

const Checkbox = ({ id, checked, onCheckedChange }: {
    id: string,
    checked: boolean,
    onCheckedChange: (checked: boolean) => void
}) => (
    <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="w-4 h-4"
    />
)




// Sample data - in real app, this would come from an API
const samplePostings = Array(20).fill(null).map((_, i) => ({
    id: i + 1,
    title: `Sample Item ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 10,
    category: ['Books', 'Electronics', 'Furniture', 'Other'][Math.floor(Math.random() * 4)],
    condition: ['New', 'Like New', 'Good', 'Fair'][Math.floor(Math.random() * 4)],
    image: 'https://via.placeholder.com/150'
}))

export default function BrowsePage() {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedConditions, setSelectedConditions] = useState<string[]>([])

    const itemsPerPage = 9
    const categories = ['Books', 'Electronics', 'Furniture', 'Other']
    const conditions = ['New', 'Like New', 'Good', 'Fair']

    // Filter and search logic
    const filteredItems = samplePostings.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category)
        const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(item.condition)
        return matchesSearch && matchesCategory && matchesCondition
    })

    // Pagination logic
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
    const currentItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <main className="container mx-auto px-4 py-8">
            {/* Search Bar */}
            <div className="mb-8">
                <Input
                    type="text"
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-xl"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Filters Section */}
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-3">Categories</h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={category}
                                        checked={selectedCategories.includes(category)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedCategories([...selectedCategories, category])
                                            } else {
                                                setSelectedCategories(selectedCategories.filter(c => c !== category))
                                            }
                                        }}
                                    />
                                    <label htmlFor={category}>{category}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Condition</h3>
                        <div className="space-y-2">
                            {conditions.map((condition) => (
                                <div key={condition} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={condition}
                                        checked={selectedConditions.includes(condition)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedConditions([...selectedConditions, condition])
                                            } else {
                                                setSelectedConditions(selectedConditions.filter(c => c !== condition))
                                            }
                                        }}
                                    />
                                    <label htmlFor={condition}>{condition}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Items Grid */}
                <div className="md:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {currentItems.map((item) => (
                            <Card key={item.id} className="p-4">
                                <img src={item.image} alt={item.title} className="w-full h-40 object-cover mb-4" />
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-green-600">${item.price}</p>
                                <p className="text-sm text-gray-600">{item.category}</p>
                                <p className="text-sm text-gray-600">{item.condition}</p>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center space-x-2 mt-8">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )}