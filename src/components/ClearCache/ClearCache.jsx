import * as React from 'react';
import styles from './ClearCache.module.css'

export default function ClearCache() {
    const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
        alert('Complete Cache Cleared');
    };

    return (
        <div style={{ height: 500, width: '80%' }}>
            <h4 className={styles.question}>How to clear complete cache data in ReactJS?</h4>
            <button onClick={() => clearCacheData()}>
                Clear Cache Data</button>
        </div>
    );
}
