import { HoneyCollection } from '@/DataModels/HoneyCollectionModel';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

interface Props {
    honeyCollections: HoneyCollection[],
    yearCollection: number;
  }

export const generatePdf = ({honeyCollections, yearCollection} : Props) => {

    const generatePDF = async () => {
        const filteredCollections = honeyCollections.filter(
          (collection) => new Date(collection.collectionDate).getFullYear() === yearCollection
        );

        const sortedCollections = filteredCollections.sort((a, b) => 
            new Date(a.collectionDate).getTime() - new Date(b.collectionDate).getTime()
        );
    
        const tableRows = sortedCollections.map((collection) => {
          return `
            <tr>
              <td>${new Date(collection.collectionDate).toLocaleDateString()}</td>
              <td>${collection.honeyQuantity}</td>
              <td>${collection.typeOfHoney}</td>
            </tr>
          `;
        }).join('');
    
        const htmlContent = `
          <html>
            <head>
              <title>Zestawienie zbioru miodu z ${yearCollection}r. z dnia ${new Date().toLocaleDateString()}</title>
              <style>
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                table, th, td {
                  border: 1px solid black;
                }
                th, td {
                  padding: 8px;
                  text-align: left;
                }
                th {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              <h1>Zestawienie zbioru miodu z ${yearCollection}</h1>
              <p>Data: ${new Date().toLocaleDateString()}</p>
              <table>
                <thead>
                  <tr>
                    <th>Data zbioru</th>
                    <th>Ilość miodu (kg)</th>
                    <th>Typ miodu</th>
                  </tr>
                </thead>
                <tbody>
                  ${tableRows}
                </tbody>
              </table>
            </body>
          </html>
        `;

        try {
          const { uri } = await Print.printToFileAsync({ html: htmlContent });
        
          if (uri) {
            if (Platform.OS === 'ios') {
              // Na iOS, udostępnij bez zapisywania w systemie plików
              await Sharing.shareAsync(uri);
            } else {
              // Ścieżka do katalogu na Androidzie, gdzie chcesz zapisać plik PDF
              const pdfDirectory = FileSystem.documentDirectory + 'myPdf.pdf';
      
              // Zapisz plik PDF w systemie plików
              await FileSystem.moveAsync({
                from: uri,
                to: pdfDirectory,
              });
      
              // Zaloguj informację o zapisaniu pliku
              console.log('PDF saved at:', pdfDirectory);
      
              // Udostępnij plik po zapisaniu
              await Sharing.shareAsync(pdfDirectory);
            }
          }
        } catch (error) {
          console.error('Error generating PDF:', error);
        }
    };

  return { generatePDF };
};