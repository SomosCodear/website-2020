import React, { Fragment, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { transparentize } from 'polished';
import { BREAKPOINTS, COLORS } from '../../style/constants';
import { conditionallyFetchItems } from '../../utils/dataFetching';
import { ITEM_TYPE_PASS } from '../../data/items/constants';
import { getItemsByType } from '../../data/items/selectors';
import { setOrderPassInfo } from '../../data/order/actions';
import { getPassHolders } from '../../data/order/selectors';
import { RadioGroup } from '../../components/RadioGroup';
import { ItemPrice } from '../../components/ItemPrice';
import {
  CheckoutStep,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
} from '../../layouts/checkout';

const Subtitle = styled.div`
  display: none;
  color: var(--color-text);
  font-size: 2.25rem;
  line-height: 2.6875rem;
  font-weight: lighter;
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: block;
  }

  strong {
    color: var(--color-accent);
  }

  p {
    margin: 2.25rem 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

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

const PassInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PassIndex = styled.h2`
  margin: 0;
  color: var(--color-accent);
  font-size: 2.25rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const PassHolderName = styled.p`
  margin: 0 0 0 4.75rem;
  color: var(--color-text);
  font-size: 1.5rem;
`;

const PassContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & + ${PassInfo} {
    margin-top: 2.5rem;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    flex-direction: row;
  }
`;

const RadioButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Total = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const TotalLabel = styled.h2`
  font-size: 2.25rem;
  color: var(--color-gray-lighter);
  font-weight: lighter;
  margin: 0;

  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 4.5rem;
    color: var(--color-accent);
  }
`;

const TotalPrice = styled.strong`
  display: block;
  white-space: nowrap;
  font-size: 4.5rem;
  color: var(--color-text);
`;

const FormContent = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    flex-grow: 1;
    display: flex;
    flex-direction: ${({ multipass }) => (multipass ? 'column' : 'row')};
    justify-content: ${({ multipass }) => (multipass ? 'flex-start' : 'space-between')};
    align-items: ${({ multipass }) => (multipass ? 'stretch' : 'center')};

    ${PassContainer} {
      flex-grow: ${({ multipass }) => (multipass ? 0 : 1)};
    }

    ${RadioButtonsContainer} {
      flex-direction: ${({ multipass }) => (multipass ? 'row' : 'column')};
      align-items: ${({ multipass }) => (multipass ? 'center' : 'flex-start')};

      label {
        margin-right: ${({ multipass }) => (multipass ? '2.5rem' : 0)};
      }
    }

    ${Total} {
      margin: ${({ multipass }) => (multipass ? 0 : '2rem')} 0;
    }

    ${TotalLabel} {
      display: ${({ multipass }) => (multipass ? 'none' : 'block')};
    }

    ${TotalPrice} {
      font-size: ${({ multipass }) => (multipass ? '3rem' : '4.5rem')};
      color: var(--color-${({ multipass }) => (multipass ? 'accent' : 'text')});
    }
  }
`;

const Disclaimer = styled.p`
  margin: ${({ withBackground }) => (withBackground ? '0 2.5rem' : '0 0 1rem 0')};
  padding: ${({ withBackground }) => (withBackground ? '2.5rem' : 0)};
  background-color: ${({ withBackground }) => (
    withBackground ? transparentize(0.5, COLORS.lilac.black) : 'none'
  )};
  border-radius: 0.625rem;
  font-size: 0.875rem;
  color: var(--color-text);
  text-align: ${({ withBackground }) => (withBackground ? 'start' : 'center')};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
  display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'block')};

  strong {
    color: var(--color-accent);
    font-weight: 500;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'block')};
  }
`;

const Passes = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const items = useSelector((state) => getItemsByType(state, ITEM_TYPE_PASS));
  const itemOptions = useMemo(
    () => items.map(({ id, name }) => ({ label: name, value: id })),
    [items],
  );
  const passHolders = useSelector(getPassHolders);
  const multipass = useMemo(() => passHolders.length > 1, [passHolders]);

  const onSubmit = useCallback((values) => {
    for (let i = 0; i < values.passHolders.length; i += 1) {
      dispatch(setOrderPassInfo(i, { item: values.passHolders[i].item }));
    }

    router.push('/checkout/addons');
  }, [dispatch, router]);

  return (
    <CheckoutStep>
      <CheckoutTitle
        title="Elegí el tipo de pase"
        description="Un pase Full te dará acceso a toda la conferencia durante los dos días del evento, 29 y 30 de mayo."
        hideDescriptionOnDesktop
      >
        {!multipass ? (
          <Subtitle>
            <p>
              Un pase&nbsp;
              <strong>Full</strong>
              &nbsp;te dará acceso a toda la conferencia durante los días del evento,
              29 y 30 de mayo.
            </p>
            <p>
              Un pase&nbsp;
              <strong>Simple</strong>
              &nbsp;te dará acceso al día de conferencia que elijas.
            </p>
          </Subtitle>
        ) : null}
      </CheckoutTitle>
      {items.length > 0 ? (
        <Formik
          initialValues={{ passHolders }}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <FormWrapper>
              <FormContent multipass={multipass}>
                {values.passHolders.map(({ firstName, lastName, item }, index) => (
                  <Fragment key={index /* eslint-disable-line react/no-array-index-key */}>
                    {multipass ? (
                      <PassInfo>
                        <PassIndex>
                          Pase&nbsp;
                          {index + 1}
                        </PassIndex>
                        <PassHolderName>
                          {firstName}
                          &nbsp;
                          {lastName}
                        </PassHolderName>
                      </PassInfo>
                    ) : null}
                    <PassContainer>
                      <RadioButtonsContainer>
                        <RadioGroup
                          name={`passHolders.${index}.item`}
                          options={itemOptions}
                        />
                      </RadioButtonsContainer>
                      <Total>
                        <TotalLabel>Tu pase costará</TotalLabel>
                        <TotalPrice>
                          <ItemPrice id={item} />
                        </TotalPrice>
                      </Total>
                    </PassContainer>
                  </Fragment>
                ))}
              </FormContent>
              <Disclaimer hideOnDesktop>
                Todos los precios son finales y en Pesos Argentinos.
              </Disclaimer>
              <CheckoutActions>
                <CheckoutAction type="submit" />
                <Disclaimer hideOnMobile withBackground={multipass}>
                  {multipass ? (
                    <>
                      Un pase&nbsp;
                      <strong>Full</strong>
                      &nbsp;te dará acceso a toda la conferencia durante los dos días del
                      evento, 29 y 30 de mayo.
                      <br />
                      Un pase&nbsp;
                      <strong>Simple</strong>
                      &nbsp;te dará acceso al día de conferencia que elijas.
                    </>
                  ) : null}
                  <br />
                  Todos los precios son finales y en Pesos Argentinos.
                </Disclaimer>
                <CheckoutAction backButton onClick={router.back} />
              </CheckoutActions>
            </FormWrapper>
          )}
        </Formik>
      ) : null}
    </CheckoutStep>
  );
};

Passes.getInitialProps = async ({ store, isServer }) => {
  await conditionallyFetchItems(store, isServer);

  return {};
};

export default Passes;
