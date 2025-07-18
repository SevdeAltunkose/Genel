import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Child, ChildContextType } from '../types';
import { useAuth } from './AuthContext';

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const useChild = () => {
  const context = useContext(ChildContext);
  if (context === undefined) {
    throw new Error('useChild must be used within a ChildProvider');
  }
  return context;
};

interface ChildProviderProps {
  children: ReactNode;
}

export const ChildProvider: React.FC<ChildProviderProps> = ({ children }) => {
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [currentChild, setCurrentChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadChildren();
    }
  }, [user]);

  const loadChildren = () => {
    try {
      const storedChildren = localStorage.getItem('children');
      if (storedChildren) {
        const parsedChildren = JSON.parse(storedChildren);
        // Sadece mevcut kullanıcının çocuklarını filtrele
        const userChildren = parsedChildren.filter((child: Child) => child.parentId === user?.id);
        setChildrenList(userChildren);
      }
    } catch (error) {
      console.error('Error loading children:', error);
    }
  };

  const saveChildren = (children: Child[]) => {
    try {
      // Mevcut tüm çocukları al
      const allChildren = JSON.parse(localStorage.getItem('children') || '[]');
      // Mevcut kullanıcının çocuklarını güncelle
      const otherChildren = allChildren.filter((child: Child) => child.parentId !== user?.id);
      const updatedChildren = [...otherChildren, ...children];
      localStorage.setItem('children', JSON.stringify(updatedChildren));
    } catch (error) {
      console.error('Error saving children:', error);
    }
  };

  const addChild = async (childData: Omit<Child, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    setLoading(true);
    try {
      const newChild: Child = {
        ...childData,
        id: Date.now().toString(),
        parentId: user?.id || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedChildren = [...childrenList, newChild];
      setChildrenList(updatedChildren);
      saveChildren(updatedChildren);
    } catch (error) {
      console.error('Error adding child:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateChild = async (id: string, updates: Partial<Child>): Promise<void> => {
    setLoading(true);
    try {
      const updatedChildren = childrenList.map(child =>
        child.id === id
          ? { ...child, ...updates, updatedAt: new Date().toISOString() }
          : child
      );
      
      setChildrenList(updatedChildren);
      saveChildren(updatedChildren);

      // Eğer güncellenmiş çocuk mevcut çocuksa, onu da güncelle
      if (currentChild?.id === id) {
        setCurrentChild(updatedChildren.find(child => child.id === id) || null);
      }
    } catch (error) {
      console.error('Error updating child:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteChild = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      const updatedChildren = childrenList.filter(child => child.id !== id);
      setChildrenList(updatedChildren);
      saveChildren(updatedChildren);

      // Eğer silinen çocuk mevcut çocuksa, currentChild'ı temizle
      if (currentChild?.id === id) {
        setCurrentChild(null);
      }
    } catch (error) {
      console.error('Error deleting child:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const setCurrentChildHandler = (child: Child) => {
    setCurrentChild(child);
    localStorage.setItem('currentChild', JSON.stringify(child));
  };

  // Sayfa yüklendiğinde mevcut çocuğu geri yükle
  useEffect(() => {
    try {
      const storedCurrentChild = localStorage.getItem('currentChild');
      if (storedCurrentChild) {
        const parsedChild = JSON.parse(storedCurrentChild);
        // Çocuğun hala mevcut kullanıcıya ait olduğunu kontrol et
        if (parsedChild.parentId === user?.id) {
          setCurrentChild(parsedChild);
        }
      }
    } catch (error) {
      console.error('Error loading current child:', error);
    }
  }, [user]);

  const value: ChildContextType = {
    children: childrenList,
    currentChild,
    setCurrentChild: setCurrentChildHandler,
    addChild,
    updateChild,
    deleteChild,
    loading,
  };

  return (
    <ChildContext.Provider value={value}>
      {children}
    </ChildContext.Provider>
  );
};