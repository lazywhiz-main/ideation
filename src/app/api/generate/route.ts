import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { who, what, how } = await request.json();

    const prompt = `
以下の3つの要素を組み合わせて、革新的な事業アイデアを日本語で提案してください。

1. まず、プロジェクトのタイトルを10文字以内で考えてください。
2. 次に、そのタイトルの下に、200文字程度で事業アイデアの説明を書いてください。

Who（ターゲット）: ${who}
What（解決したい課題）: ${what}
How（実現方法）: ${how}

【出力形式】
タイトル: ○○○○
説明: ○○○○
`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices[0].message.content || '';
    // タイトルと説明を抽出
    const titleMatch = content.match(/タイトル[:：]\s*(.+)/);
    const descMatch = content.match(/説明[:：]\s*([\s\S]*)/);
    const title = titleMatch ? titleMatch[1].trim() : '';
    const description = descMatch ? descMatch[1].trim() : content.trim();

    return NextResponse.json({ title, description });
  } catch (error) {
    console.error('Error generating idea:', error);
    return NextResponse.json(
      { error: 'アイデアの生成中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 