import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { parseFrontmatter } from '../utils/markdown';
import './BlogList.css';

export default function BlogList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Vite's import.meta.glob with ?raw to get string content
        const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' });

        const fetchPosts = async () => {
            try {
                const postsData = await Promise.all(
                    Object.entries(modules).map(async ([path, resolver]) => {
                        const content = await resolver();
                        const { data } = parseFrontmatter(content);
                        const slug = path.split('/').pop().replace('.md', '');
                        return { ...data, slug };
                    })
                );
                // Sort by date descending
                setPosts(postsData.sort((a, b) => new Date(b.date) - new Date(a.date)));
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container blog-container">
            <h2>Blog</h2>
            <div className="blog-grid">
                {posts.length === 0 && <p style={{ color: '#fff' }}>Ładowanie lub brak wpisów...</p>}
                {posts.map((post) => (
                    <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
                        <div className="blog-card-content">
                            <h3>{post.title}</h3>
                            <p className="blog-date">{post.date}</p>
                            <p className="blog-excerpt">{post.excerpt}</p>
                            <span className="read-more">Czytaj więcej &rarr;</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
