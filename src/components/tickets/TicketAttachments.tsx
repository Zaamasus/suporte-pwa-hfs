import { Attachment } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Paperclip, Image, Film, FileText, X, Download } from 'lucide-react';
import { useState } from 'react';

interface TicketAttachmentsProps {
  attachments: Attachment[];
}

export function TicketAttachments({ attachments }: TicketAttachmentsProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  if (!attachments || attachments.length === 0) {
    return null;
  }

  // Função para determinar o ícone correto baseado no mimetype
  const getFileIcon = (mimetype: string) => {
    if (mimetype.startsWith('image/')) {
      return <Image className="h-5 w-5 text-blue-500" />;
    } else if (mimetype.startsWith('video/')) {
      return <Film className="h-5 w-5 text-purple-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  // Formatar tamanho do arquivo para exibição
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Card className="border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm">
      <CardHeader className="bg-gray-50 dark:bg-dark-300">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/20">
            <Paperclip className="h-5 w-5 text-primary-500" />
          </div>
          <h3 className="text-lg font-medium">Anexos ({attachments.length})</h3>
        </div>
      </CardHeader>
      <CardContent className="divide-y divide-gray-100 dark:divide-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
          {attachments.map((attachment) => (
            <div 
              key={attachment.id} 
              className="flex flex-col border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-md transition-all"
            >
              {attachment.mimetype.startsWith('image/') ? (
                <div className="relative">
                  <div 
                    className="h-40 w-full bg-gray-50 dark:bg-gray-700 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setExpandedImage(attachment.url)}
                  >
                    <img 
                      src={attachment.url} 
                      alt={attachment.originalname}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              ) : attachment.mimetype.startsWith('video/') ? (
                <div className="h-40 w-full bg-gray-50 dark:bg-gray-700">
                  <video 
                    src={attachment.url} 
                    className="h-full w-full object-contain" 
                    controls
                  />
                </div>
              ) : (
                <div className="h-40 w-full flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                  {getFileIcon(attachment.mimetype)}
                </div>
              )}
              
              <div className="p-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-2 min-w-0">
                  {getFileIcon(attachment.mimetype)}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {attachment.originalname}
                  </span>
                </div>
                <a 
                  href={attachment.url} 
                  download={attachment.originalname}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Download"
                >
                  <Download className="h-4 w-4 text-gray-500" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Modal para visualizar imagem expandida */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={expandedImage} 
              alt="Imagem expandida"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </Card>
  );
} 