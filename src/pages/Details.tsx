import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { realtimeDB } from '@/config/firebaseConfig';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Detail {
  [key: string]: unknown; // The type can be more specific depending on your structure
}

function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState<Detail | null>(null); // Specify the type of details
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const dataRef = ref(realtimeDB, `Form responses 2/${id}`);
        onValue(dataRef, (snapshot) => {
          const data = snapshot.val();
          setDetails(data);
          setLoading(false); // Stop loading once data is fetched
        });
      } catch (error) {
        console.error(error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]); // Dependency array ensures it runs only when 'id' changes

  return (
    <div>
      <h1 className="py-5 underline text-4xl font-bold text-center">QR Code Data</h1>
      <div className="flex flex-col items-center justify-center h-auto">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Details for ID: {id}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              // Skeleton loader displayed while data is being fetched
              <>
                <div className="mb-4 last:mb-0">
                  <dt className="font-semibold text-gray-700 dark:text-gray-300">Email address</dt>
                  <Skeleton className="mt-1 w-3/4 h-6" />
                </div>
                <div className="mb-4 last:mb-0">
                  <dt className="font-semibold text-gray-700 dark:text-gray-300">Food Type</dt>
                  <Skeleton className="mt-1 w-1/4 h-6" />
                </div>
                <div className="mb-4 last:mb-0">
                  <dt className="font-semibold text-gray-700 dark:text-gray-300">Name</dt>
                  <Skeleton className="mt-1 w-3/4 h-6" />
                </div>
                <div className="mb-4 last:mb-0">
                  <dt className="font-semibold text-gray-700 dark:text-gray-300">SR Number</dt>
                  <Skeleton className="mt-1 w-1/4 h-6" />
                </div>
                <div className="mb-4 last:mb-0">
                  <dt className="font-semibold text-gray-700 dark:text-gray-300">Semester</dt>
                  <Skeleton className="mt-1 w-1/4 h-6" />
                </div>
                <div className="mb-4 last:mb-0">
                  <dt className="font-semibold text-gray-700 dark:text-gray-300">Timestamp</dt>
                  <Skeleton className="mt-1 w-full h-6" />
                </div>
                <div className="mb-4 last:mb-0">
                  <dt className="font-semibold text-gray-700 dark:text-gray-300">food</dt>
                  <Skeleton className="mt-1 w-1/4 h-6" />
                </div>
              </>
            ) : details ? (
              Object.entries(details).map(([key, value]) => (
                <div key={key} className="mb-4 last:mb-0">
                  <dt className="font-semibold text-gray-700 dark:text-gray-300">{key}</dt>
                  <dd className="mt-1 text-gray-900 dark:text-gray-100">{String(value)}</dd>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No details found for this ID.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Details;
