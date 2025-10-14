import Link from 'next/link';

const Navbar = () => {
    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <Link href="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
            <Link href="/products">Products</Link>
        </nav>
    );
};

export default Navbar;