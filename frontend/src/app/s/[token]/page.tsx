interface SharePageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">공유된 추억</h1>
      <p className="text-gray-600">Token: {token}</p>
      <p className="text-gray-600 mt-4">공유된 추억이 여기에 표시됩니다.</p>
    </div>
  );
}
