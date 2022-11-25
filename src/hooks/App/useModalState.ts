import { useCallback, useState } from "react";

const useModalState = () => {
  const [modal, setModal] = useState({
    show: false,
    endgame: false,
  });

  const openEndgame = useCallback(() => {
    setModal({
      show: true,
      endgame: true,
    });
  }, [setModal]);

  const openModal = () => {
    setModal({
      show: true,
      endgame: false,
    });
  };

  const closeModal = () => {
    setModal({
      ...modal,
      show: false,
    });
    setTimeout(
      () =>
        setModal({
          show: false,
          endgame: false,
        }),
      500
    );
  };

  const closeEndgame = () => {
    setModal({
      ...modal,
      endgame: false,
    });
  };

  return { modal, openEndgame, openModal, closeModal, closeEndgame };
};

export default useModalState;
