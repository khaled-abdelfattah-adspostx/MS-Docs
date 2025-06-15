// Documentation fetching service
export const fetch_webpage = async (url: string, query: string): Promise<string> => {
  try {
    // Since we can't directly fetch from external URLs due to CORS,
    // we'll return a placeholder that includes a webview iframe
    return `
      <div class="space-y-6">
        <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            ${query}
          </h3>
          <p class="text-blue-700 dark:text-blue-300 text-sm mb-4">
            Access the complete documentation directly below or visit 
            <a href="${url}" target="_blank" class="underline hover:no-underline font-medium">${url}</a>
          </p>
          
          <!-- Quick Access Webview -->
          <div class="bg-white dark:bg-moment-gray-800 rounded-lg border border-moment-gray-200 dark:border-moment-gray-600 overflow-hidden">
            <div class="bg-moment-gray-100 dark:bg-moment-gray-700 px-4 py-2 border-b border-moment-gray-200 dark:border-moment-gray-600">
              <p class="text-sm font-medium text-moment-gray-700 dark:text-moment-gray-300">
                📖 Quick Access Documentation View
              </p>
            </div>
            <iframe
              src="${url}"
              class="w-full h-96 border-0"
              title="${query}"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    throw new Error(`Failed to fetch documentation: ${error}`);
  }
};
