import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Overlay Scrollbar
import 'overlayscrollbars/overlayscrollbars.css';

// Mantine datatable
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RouterProvider router={router} />
                </PersistGate>
            </Provider>
        </Suspense>
    </React.StrictMode>
);
