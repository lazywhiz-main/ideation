'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { whoCards, whatCards, howCards } from '@/data/cards';

export default function Home() {
  const [selectedWho, setSelectedWho] = useState<string>('');
  const [selectedWhat, setSelectedWhat] = useState<string>('');
  const [selectedHow, setSelectedHow] = useState<string>('');
  const [ideaTitle, setIdeaTitle] = useState<string>('');
  const [ideaDesc, setIdeaDesc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const drawRandomCards = () => {
    const randomWho = whoCards[Math.floor(Math.random() * whoCards.length)];
    const randomWhat = whatCards[Math.floor(Math.random() * whatCards.length)];
    const randomHow = howCards[Math.floor(Math.random() * howCards.length)];
    setSelectedWho(randomWho);
    setSelectedWhat(randomWhat);
    setSelectedHow(randomHow);
  };

  const generateIdea = async () => {
    if (!selectedWho || !selectedWhat || !selectedHow) {
      alert('すべてのカードを選択してください');
      return;
    }
    setIsLoading(true);
    setIdeaTitle('');
    setIdeaDesc('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ who: selectedWho, what: selectedWhat, how: selectedHow }),
      });
      const data = await response.json();
      setIdeaTitle(data.title);
      setIdeaDesc(data.description);
    } catch (error) {
      console.error('Error generating idea:', error);
      alert('アイデアの生成中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">事業アイデア生成ツール</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Who</h2>
            <div className="grid grid-cols-2 gap-4">
              {whoCards.map((card) => (
                <Card
                  key={card}
                  className={`cursor-pointer transition-all ${
                    selectedWho === card
                      ? 'border-2 border-pink-400 bg-pink-100 shadow-md scale-105'
                      : 'hover:border-blue-400'
                  }`}
                  onClick={() => setSelectedWho(card)}
                >
                  <CardContent className="p-4 text-center font-semibold text-blue-700">
                    {card}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-purple-600">What</h2>
            <div className="grid grid-cols-2 gap-4">
              {whatCards.map((card) => (
                <Card
                  key={card}
                  className={`cursor-pointer transition-all ${
                    selectedWhat === card
                      ? 'border-2 border-blue-400 bg-blue-100 shadow-md scale-105'
                      : 'hover:border-purple-400'
                  }`}
                  onClick={() => setSelectedWhat(card)}
                >
                  <CardContent className="p-4 text-center font-semibold text-purple-700">
                    {card}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-pink-600">How</h2>
            <div className="grid grid-cols-2 gap-4">
              {howCards.map((card) => (
                <Card
                  key={card}
                  className={`cursor-pointer transition-all ${
                    selectedHow === card
                      ? 'border-2 border-purple-400 bg-purple-100 shadow-md scale-105'
                      : 'hover:border-pink-400'
                  }`}
                  onClick={() => setSelectedHow(card)}
                >
                  <CardContent className="p-4 text-center font-semibold text-pink-700">
                    {card}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            onClick={drawRandomCards} 
            className="bg-blue-600 text-white font-bold shadow hover:bg-blue-700 h-14 px-8 text-lg rounded-lg"
          >
            カードを引く
          </Button>
          <Button 
            onClick={generateIdea}
            disabled={isLoading}
            className="min-w-[140px] h-14 px-8 text-lg rounded-lg bg-pink-500 text-white font-bold shadow hover:bg-pink-600"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>生成中...</span>
              </div>
            ) : (
              'アイデアを生成'
            )}
          </Button>
        </div>
        {isLoading && (
          <Card className="bg-white animate-pulse border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-500">アイデアを生成中...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-blue-100 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-purple-100 rounded w-1/2"></div>
            </CardContent>
          </Card>
        )}
        {!isLoading && ideaTitle && (
          <Card className="bg-white border-2 border-blue-200 shadow-xl mt-4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-700 mb-2">{ideaTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-lg text-gray-700">{ideaDesc}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
