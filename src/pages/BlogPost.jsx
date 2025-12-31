import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import { parseFrontmatter } from '../utils/markdown';
import { ChevronLeft, Share2, Facebook, Twitter, Link2 } from 'lucide-react';
import './BlogPost.css';

export default function BlogPost() {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadPost = async () => {
            try {
                setLoading(true);
                const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' });

                let foundPath = null;
                for (const path in modules) {
                    if (path.endsWith(`/${slug}.md`)) {
                        foundPath = path;
                        break;
                    }
                }

                if (foundPath) {
                    const rawContent = await modules[foundPath]();
                    const { data, content } = parseFrontmatter(rawContent);
                    setMeta(data);
                    setContent(content);
                } else {
                    setContent('# Post nie został znaleziony.');
                }
            } catch (err) {
                console.error("Error loading post:", err);
                setContent('# Błąd ładowania posta.');
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };

        loadPost();
    }, [slug]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: meta.title || 'Dymek Blog',
                text: meta.excerpt,
                url: window.location.href,
            }).catch(console.error);
        } else {
            copyToClipboard();
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const shareUrl = window.location.href;
    const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const twitterLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(meta.title)}`;

    if (loading) return <div className="container" style={{ paddingTop: '120px', color: '#fff' }}>Ładowanie...</div>;

    return (
        <div className="container blog-post-container">
            <Helmet>
                <title>{meta.title ? `${meta.title} - Dymek` : 'Blog - Dymek'}</title>
                <meta name="description" content={meta.excerpt || 'Blog sklepu Dymek'} />
                <meta property="og:title" content={meta.title || 'Dymek Blog'} />
                <meta property="og:description" content={meta.excerpt || 'Blog sklepu Dymek'} />
                {meta.image && <meta property="og:image" content={meta.image} />}
                <meta property="og:url" content={shareUrl} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <Link to="/blog" className="back-link">
                <ChevronLeft size={20} /> Wróć do bloga
            </Link>

            {meta.title && (
                <header className="post-header">
                    <h1>{meta.title}</h1>
                    <p className="post-date">{meta.date}</p>
                </header>
            )}

            <article className="markdown-content">
                <Markdown>{content}</Markdown>
            </article>

            <div className="share-section">
                <h3>Udostępnij ten wpis:</h3>
                <div className="share-buttons">
                    <button className="share-btn mobile-only" onClick={handleShare}>
                        <Share2 size={20} /> Udostępnij
                    </button>
                    <a href={fbLink} target="_blank" rel="noopener noreferrer" className="share-btn fb">
                        <Facebook size={20} /> Facebook
                    </a>
                    <a href={twitterLink} target="_blank" rel="noopener noreferrer" className="share-btn tw">
                        <Twitter size={20} /> X / Twitter
                    </a>
                    <button className="share-btn copy" onClick={copyToClipboard}>
                        <Link2 size={20} /> {copied ? 'Skopiowano!' : 'Kopiuj Link'}
                    </button>
                </div>
            </div>
        </div>
    );
}
