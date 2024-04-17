import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  refresh: () => void;
  triggerSuccessToast: () => void;
};

const AuthenticationModal = ({
  setModalOpen,
  refresh,
  triggerSuccessToast,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);

  async function enableDraft() {
    try {
      const response = await fetch('/api/draft/enable?token=' + inputValue);
      if (response.status === 200) {
        refresh();
        setModalOpen(false);
        triggerSuccessToast();
        return;
      } else {
        throw new Error('Wrong token!');
      }
    } catch (error) {
      setInputValue('');
      setHasError(true);
    }
  }

  return (
    <div
      className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
      role="alert"
    >
      <div className="flex items-center gap-2">
        <span className="shrink-0 rounded-full bg-primary p-2 text-white">
          <svg
            fill="none"
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            ></path>
          </svg>
        </span>

        <p className="font-medium sm:text-lg">Authenticate First!</p>
      </div>
      <p className="mt-4 text-gray-500">
        You will need a secret token to access the drafts, please add it bellow:
      </p>
      <div>
        <input
          type="token"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setHasError(false);
          }}
          id="UserToken"
          className={
            'mt-4 w-full rounded-md border-2 border-gray-100 p-2 shadow-sm sm:text-sm' +
            (hasError ? ' border-red-300' : '')
          }
        />
        {hasError && <p className="mt-4 text-red-400">Incorrect token!</p>}
      </div>
      <div className="mt-6 sm:flex sm:gap-4">
        <div
          onClick={enableDraft}
          className="inline-block w-full rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white hover:cursor-pointer sm:w-auto"
        >
          Authenticate
        </div>

        <div
          className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 hover:cursor-pointer sm:mt-0 sm:w-auto"
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModal;
