import styled from "styled-components";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function Symptoms({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      {/* <Heading as="h3">{resourceName}</Heading> */}
      <p>
        Please fill in symptoms before session is booked
      </p>

      <div>
        <form>
          <label>Name</label>
          <input type="text" />
          <label>Bloodgroup</label>
          <select>
            <option>O</option>
            <option>A</option>
            <option>B</option>
          </select>
          <label>Genotype</label>
          <input type="text" />
          <label>symptoms</label>
          <textarea />
        </form>
      </div>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variation="primary" disabled={disabled} onClick={onConfirm}>
          Book session
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default Symptoms;
