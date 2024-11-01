import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import { getSelectDoctor } from "@/services/useAuth";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import SpinnerMini from "./SpinnerMini";

const StyledConfirmDelete = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  & input, & textarea {
    width: 22rem;
    height: 2.2rem;
    outline: none;
    border: 1px solid var(--color-grey-500);
    border-radius: 0.3rem;
    margin-bottom: 0.3rem;
  }

  & label {
    align-self: start;
    color: var(--color-grey-500);
  }

  & textarea {
    height: 4.3rem;
  }
`;

interface SymptomsProps {
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal: () => void;
  docId: string;
  render: number;
  setRender: ()=> void;
}

function Symptoms({  disabled, onCloseModal, docId, setRender, render } : SymptomsProps) {
  const { user, role } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    genotype: "",
    age: "",
    symptoms: "",
    render: render,
    docId: docId,
    patID: user?.uid
  });

  async function handlePickDoctor(formData: any) {
    setIsLoading(true);
    try {
      await getSelectDoctor(formData);
      setRender((render)=>render+1);
      console.log(formData);
      toast.success("Session booked successfully")

    } catch {
      toast.error("Network error");
    } finally {
      setIsLoading(false)
      onCloseModal();
    }
    
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    try {
    handlePickDoctor(formData);
    // onConfirm({...formData, docId: docId}); // Pass formData to onConfirm
    } catch {
      toast.error("Error submitting data");
    } 
    
  }


  return (
    <StyledConfirmDelete>
      <p>Please fill in symptoms before session is booked</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label htmlFor="bloodGroup">Blood Group</label>
        <input
          type="text"
          id="bloodGroup"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        />

        <label htmlFor="genotype">Genotype</label>
        <input
          type="text"
          id="genotype"
          name="genotype"
          value={formData.genotype}
          onChange={handleChange}
          required
        />

        <label htmlFor="symptoms">Symptoms</label>
        <textarea
          id="symptoms"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          placeholder=" cough, fever ..."
          required
        />
        
        <div>
          <Button variation="secondary" disabled={disabled} onClick={onCloseModal}>
            Cancel
          </Button>
          <Button type="submit" variation="primary" disabled={disabled}>
            {isLoading? <SpinnerMini /> :"Book session"}
          </Button>
        </div>
      </form>
    </StyledConfirmDelete>
  );
}
export default Symptoms;
