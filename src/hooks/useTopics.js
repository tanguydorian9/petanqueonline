import { useState, useCallback } from 'react';

export function useTopics(deptNumber, defaultTopic) {
  const STORAGE_KEY = `topics_${deptNumber}`;

  const getStoredTopics = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    if (defaultTopic) {
      const initial = [{
        id: Date.now(),
        ...defaultTopic,
        date: 'À l\'instant',
      }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return [];
  };

  const [topics, setTopics] = useState(getStoredTopics);

  const addTopic = useCallback((topic) => {
    const newTopic = { id: Date.now(), likes: 0, date: new Date().toLocaleDateString(), ...topic };
    setTopics(prev => {
      const updated = [...prev, newTopic];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [STORAGE_KEY]);

  const deleteTopic = useCallback((id) => {
    setTopics(prev => {
      const updated = prev.filter(t => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [STORAGE_KEY]);

  const toggleLike = useCallback((id) => {
    setTopics(prev => {
      const updated = prev.map(t =>
        t.id === id ? { ...t, likes: (t.likes || 0) + 1 } : t
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [STORAGE_KEY]);

  const clearAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setTopics(getStoredTopics());
  }, [STORAGE_KEY]);

  return { topics, addTopic, deleteTopic, toggleLike, clearAll };
}
