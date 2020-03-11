import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { BREAKPOINTS } from '../../style/constants';
import { conditionallyFetchItems } from '../../utils/dataFetching';
import { passHolderSchema } from '../../data/order/schemas';
import { addOrderPass, removeOrderPass, setOrderPassInfo } from '../../data/order/actions';
import { getPassHolders, getFirstInvalidPassholder } from '../../data/order/selectors';
import {
  CheckoutStep,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
} from '../../layouts/checkout';
import { TextBox, ErrorNugget, Counter } from '../../style/lilac/components';

const FormWrapper = styled(Form)`
  display: block;
  padding: 0 2rem;

  @media (min-width: ${BREAKPOINTS.hd}) {
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const PassCounter = styled.div`
  display: none;

  @media (min-width: ${BREAKPOINTS.hd}) {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 2.25rem;
    color: var(--color-text);
  }
`;

const PassPicker = styled.div`
  display: none;

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-top: 3rem;
    display: flex;
    flex-direction: row;
  }
`;

const PassButton = styled.button.attrs(() => ({ type: 'button' }))`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  border: none;
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-${({ active }) => (active ? 'text' : 'accent')});
  text-transform: uppercase;
  cursor: pointer;

  & + & {
    margin-left: 4rem;
  }

  span {
    visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
    margin-left: 0.5rem;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-color: var(--color-text);
    border-radius: 2rem;
  }
`;

const Fields = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Info = styled.p`
  font-size: 0.875rem;
  color: var(--color-text);

  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 1rem;
  }
`;

const MultipassWrapper = styled.div`
  display: none;

  & + * {
    flex-grow: 1;
    margin-left: 0;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    display: block;
    & + * {
      flex-grow: 0;
    }
  }
`;

const PassHolders = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  // pass holders management
  const passHolders = useSelector(getPassHolders);
  const addPassHolder = useCallback(() => dispatch(addOrderPass()), [dispatch]);
  const removePassHolder = useCallback(() => {
    dispatch(removeOrderPass(passHolders.length - 1));

    if (current === passHolders.length - 1) {
      setCurrent(current - 1);
    }
  }, [passHolders, current, dispatch, setCurrent]);
  const saveCurrentPassHolder = useCallback((values) => {
    dispatch(setOrderPassInfo(current, values));
  }, [current, dispatch]);

  // multipass mannagement
  const [multipass, setMultipass] = useState(passHolders.length > 1);
  const toggleMultipass = useCallback(() => {
    if (multipass) {
      for (let i = passHolders.length - 1; i > 0; i -= 1) {
        dispatch(removeOrderPass(i));
      }
      setCurrent(0);
    }

    setMultipass(!multipass);
  }, [multipass, passHolders, dispatch, setMultipass]);

  // submit
  const [showError, setShowError] = useState(false);
  const [shouldContinue, setShouldContinue] = useState(false);
  const firstInvalid = useSelector(getFirstInvalidPassholder);
  const onPassHolderSubmit = useCallback((values) => {
    saveCurrentPassHolder(values);
    setShouldContinue(true);
    setShowError(true);
  }, [saveCurrentPassHolder, setShouldContinue]);

  useEffect(() => {
    if (shouldContinue) {
      setShouldContinue(false);

      if (firstInvalid === -1) {
        router.push('/checkout/pass');
      } else {
        setCurrent(firstInvalid);
      }
    }
  }, [shouldContinue, firstInvalid, router, setCurrent, setShouldContinue]);

  return (
    <CheckoutStep>
      <CheckoutTitle title="Completá tus datos" />
      <Formik
        key={current}
        initialValues={passHolders[current]}
        validationSchema={passHolderSchema}
        onSubmit={onPassHolderSubmit}
        validateOnMount
      >
        {({ values, isValid, submitCount }) => (
          <FormWrapper>
            <div>
              {multipass ? (
                <>
                  <PassCounter>
                    ¿Cuántos pases vas a comprar?&nbsp;&nbsp;
                    <Counter
                      min={1}
                      max={5}
                      value={passHolders.length}
                      onChange={(value) => (
                        value > passHolders.length ? addPassHolder() : removePassHolder()
                      )}
                    />
                  </PassCounter>
                  <PassPicker>
                    {passHolders.map((_, index) => (
                      <PassButton
                        key={index /* eslint-disable-line react/no-array-index-key */}
                        active={index === current}
                        onClick={() => {
                          saveCurrentPassHolder(values);
                          setCurrent(index);
                          setShowError(false);
                        }}
                      >
                        Pase&nbsp;
                        {index + 1}
                        <span />
                      </PassButton>
                    ))}
                  </PassPicker>
                </>
              ) : null}
              <Fields>
                <Field
                  as={TextBox}
                  id="firstName"
                  name="firstName"
                  label="Nombre"
                  medium
                />
                <Field
                  as={TextBox}
                  id="lastName"
                  name="lastName"
                  label="Apellido"
                  medium
                />
                <Field
                  as={TextBox}
                  id="identityDocument"
                  name="identityDocument"
                  label="DNI o Pasaporte"
                  small
                />
                <Field
                  as={TextBox}
                  id="email"
                  name="email"
                  label="E-mail"
                  type="email"
                  large
                />
              </Fields>
              {(showError || submitCount > 0) && !isValid ? (
                <ErrorNugget>
                  Revisá estos datos.
                </ErrorNugget>
              ) : null}
            </div>
            <Info>
              La información solicitada en esta pantalla es utilizada para: 1) identificarte en la acreditación y durante la conferencia; 2) enviarte por correo electrónico tu pase; 3) indicar a nuestro servicio de catering que tenga en consideración tu preferencia alimentaria.
            </Info>
            <CheckoutActions>
              <MultipassWrapper>
                <CheckoutAction
                  label={multipass ? 'Comprar pase individual' : 'Comprar varios pases'}
                  onClick={toggleMultipass}
                />
              </MultipassWrapper>
              <CheckoutAction type="submit" />
            </CheckoutActions>
          </FormWrapper>
        )}
      </Formik>
    </CheckoutStep>
  );
};

PassHolders.getInitialProps = async ({ store, isServer }) => {
  await conditionallyFetchItems(store, isServer);

  return {};
};

export default PassHolders;
