'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { whoCards, whatCards, howCards } from '@/data/cards';

function CheckIcon() {
  return (
    <span className="absolute top-2 right-2" style={{ color: '#488EF5', fontSize: '1.25rem' }}>✓</span>
  );
}

export default function Home() {
  const [selectedWho, setSelectedWho] = useState<string>('');
  const [selectedWhat, setSelectedWhat] = useState<string>('');
  const [selectedHow, setSelectedHow] = useState<string>('');
  const [ideaTitle, setIdeaTitle] = useState<string>('');
  const [ideaDesc, setIdeaDesc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mainColor = '#488EF5';

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
    <main className="min-h-screen p-0 bg-gray-50">
      {/* ヒーローセクション */}
      <section className="w-full py-16 px-4 bg-white shadow-sm mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: mainColor, letterSpacing: '-0.03em', textShadow: '0 2px 8px #488ef52a' }}>
            事業アイデア生成ツール
          </h1>
          <p className="text-lg text-gray-700 mb-2">3つのカードを組み合わせて、<br className="sm:hidden" />新しいビジネスの種を生み出そう。</p>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: mainColor, opacity: 0.7 }} />
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-1" style={{ color: mainColor }}>Who</h2>
            <p className="text-xs text-gray-500 mb-2">ターゲットとなる人物</p>
            <div className="grid grid-cols-2 gap-4">
              {whoCards.map((card) => (
                <div className="relative" key={card}>
                  <Card
                    className={`cursor-pointer transition-all w-full h-16 flex items-center justify-center border border-gray-300 bg-white text-gray-800 text-lg font-semibold rounded-lg ${
                      selectedWho === card
                        ? 'border-2 shadow-md scale-105'
                        : 'hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    style={selectedWho === card ? { borderColor: mainColor, background: '#eaf2fd', color: mainColor } : {}}
                    onClick={() => setSelectedWho(card)}
                  >
                    {selectedWho === card && <CheckIcon />}
                    <CardContent className="p-2 text-center flex items-center justify-center h-full w-full">
                      {card}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-1" style={{ color: mainColor }}>What</h2>
            <p className="text-xs text-gray-500 mb-2">解決したい課題</p>
            <div className="grid grid-cols-2 gap-4">
              {whatCards.map((card) => (
                <div className="relative" key={card}>
                  <Card
                    className={`cursor-pointer transition-all w-full h-16 flex items-center justify-center border border-gray-300 bg-white text-gray-800 text-lg font-semibold rounded-lg ${
                      selectedWhat === card
                        ? 'border-2 shadow-md scale-105'
                        : 'hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    style={selectedWhat === card ? { borderColor: mainColor, background: '#eaf2fd', color: mainColor } : {}}
                    onClick={() => setSelectedWhat(card)}
                  >
                    {selectedWhat === card && <CheckIcon />}
                    <CardContent className="p-2 text-center flex items-center justify-center h-full w-full">
                      {card}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-1" style={{ color: mainColor }}>How</h2>
            <p className="text-xs text-gray-500 mb-2">実現方法</p>
            <div className="grid grid-cols-2 gap-4">
              {howCards.map((card) => (
                <div className="relative" key={card}>
                  <Card
                    className={`cursor-pointer transition-all w-full h-16 flex items-center justify-center border border-gray-300 bg-white text-gray-800 text-lg font-semibold rounded-lg ${
                      selectedHow === card
                        ? 'border-2 shadow-md scale-105'
                        : 'hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    style={selectedHow === card ? { borderColor: mainColor, background: '#eaf2fd', color: mainColor } : {}}
                    onClick={() => setSelectedHow(card)}
                  >
                    {selectedHow === card && <CheckIcon />}
                    <CardContent className="p-2 text-center flex items-center justify-center h-full w-full">
                      {card}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mb-10">
          <Button 
            onClick={drawRandomCards} 
            className="font-bold shadow h-14 px-8 text-lg rounded-lg flex items-center gap-2"
            style={{ background: mainColor, color: '#fff' }}
          >
            <span role="img" aria-label="カード">🎴</span> カードを引く
          </Button>
          <Button 
            onClick={generateIdea}
            disabled={isLoading}
            className="min-w-[140px] h-14 px-8 text-lg rounded-lg font-bold shadow flex items-center gap-2"
            style={{ background: mainColor, color: '#fff' }}
          >
            <span role="img" aria-label="電球">💡</span> {isLoading ? (
              <span className="flex items-center gap-2 font-bold">
                <span>生成中...</span>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </span>
            ) : (
              'アイデアを生成'
            )}
          </Button>
        </div>
        {isLoading && (
          <Card className="bg-white animate-pulse border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold" style={{ color: mainColor }}>アイデアを生成中...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-4" style={{ background: '#eaf2fd' }}></div>
              <div className="h-4 mt-2" style={{ background: '#eaf2fd', width: '50%' }}></div>
            </CardContent>
          </Card>
        )}
        {!isLoading && ideaTitle && (
          <Card className="bg-white border-2 shadow-xl mt-4" style={{ borderColor: mainColor }}>
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-2" style={{ color: mainColor }}>{ideaTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-lg text-gray-700 leading-relaxed">{ideaDesc}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
