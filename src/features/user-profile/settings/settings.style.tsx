import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const Rows = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
`;

const Cols = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  flex: 1 1 0;
  min-width: 0;
`;

const SettingsForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeadingSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const Title = styled.h3`
  font-family: ${themeGet('fonts.heading', 'sans-serif')};
  font-size: ${themeGet('fontSizes.lg', '21')}px;
  font-weight: ${themeGet('fontWeights.semiBold', '600')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
`;

const SettingsFormContent = styled.div`
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Row = styled(Rows)`
  margin-bottom: 40px;

  @media only screen and (min-width: 0em) and (max-width: 47.99em) {
    margin-bottom: 30px;
  }
`;

const Col = styled(Cols)`
  @media only screen and (min-width: 0em) and (max-width: 47.99em) {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;

  .radioGroup {
    flex-grow: 1;
    justify-content: space-between;

    label {
      margin-top: 0;
      flex: calc(33.333333333% - 10px);
      max-width: calc(33.333333333% - 10px);
      margin-bottom: 15px;

      &:nth-child(3n) {
        margin-right: 0;
      }

      @media (max-width: 700px) {
        flex: calc(50% - 10px);
        max-width: calc(50% - 10px);

        &:nth-child(3n) {
          margin-right: 15px;
        }

        &:nth-child(2n) {
          margin-right: 0;
        }
      }

      @media (max-width: 480px) {
        flex: 100%;
        max-width: 100%;
        margin-right: 0;

        &:nth-child(3n) {
          margin-right: 0;
        }

        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }

  .add-button {
    flex: calc(33.3333333333% - 10px);
    max-width: calc(33.3333333333% - 10px);
    flex-shrink: 0;
    height: auto;
    min-height: 77px;
    border: 1px dashed ${themeGet('colors.gray.500', '#f1f1f1')};
    margin-bottom: 15px;
    margin-left: 0;
    margin-right: auto;
    &:hover {
      border-color: ${themeGet('colors.primary.regular', '#009e7f')};
    }

    @media (max-width: 700px) {
      flex: calc(50% - 10px);
      max-width: calc(50% - 10px);
    }

    @media (max-width: 480px) {
      flex: 100%;
      max-width: 100%;
    }
  }
`;

// ============ PROFILE OVERVIEW CARD ============

const ProfileOverviewCard = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #133595 0%, #1a4bc6 100%);
  border-radius: 12px;
  padding: 30px 35px;
  margin-bottom: 30px;
  color: #ffffff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.16);

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    text-align: center;
    padding: 25px 20px;
  }
`;

const AvatarCircle = styled.div`
  width: 80px;
  height: 80px;
  min-width: 80px;
  border-radius: 50%;
  background-color: #fe5e00;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin-right: 25px;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 767px) {
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProfileName = styled.h2`
  font-family: ${themeGet('fonts.heading', 'sans-serif')};
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 4px;
  line-height: 1.5;

  i {
    margin-right: 10px;
    font-size: 14px;
    opacity: 0.75;
  }

  @media only screen and (max-width: 767px) {
    justify-content: center;
  }
`;

const ProfileBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  margin-top: 8px;
  width: fit-content;

  i {
    margin-right: 6px;
    font-size: 12px;
  }

  @media only screen and (max-width: 767px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

// ============ SECTION WRAPPER ============

const SectionCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  padding: 30px;
  margin-bottom: 30px;

  @media only screen and (max-width: 767px) {
    padding: 20px 15px;
    margin-bottom: 20px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f1f1f1;
`;

const SectionIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 6px;
  background-color: #F7F7F7;
  color: #133595;
  margin-right: 15px;
  font-size: 18px;
`;

const SectionTitle = styled.h3`
  font-family: ${themeGet('fonts.heading', 'sans-serif')};
  font-size: 19px;
  font-weight: 600;
  color: ${themeGet('colors.text.bold', '#0D1136')};
  margin: 0;
`;

// ============ FORM GRID ============

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  @media only screen and (max-width: 767px) {
    button {
      width: 100%;
    }
  }
`;

export {
    SettingsForm,
    HeadingSection,
    Title,
    SettingsFormContent,
    Col,
    Row,
    ButtonGroup,
    ProfileOverviewCard,
    AvatarCircle,
    ProfileInfo,
    ProfileName,
    ProfileDetail,
    ProfileBadge,
    SectionCard,
    SectionHeader,
    SectionIcon,
    SectionTitle,
    FormRow,
    FormField,
    FormActions,
};
