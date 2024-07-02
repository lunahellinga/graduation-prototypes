import {updateTodos} from "@/lib/queries/template";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {useRecoilValue} from "recoil";
import {getAtomTodos} from "@/state-management/recoil-with-family/atoms";

export function Save() {
  const todos = useRecoilValue(getAtomTodos)
  const [saving, setSaving] = useState<boolean>(false);

  return (
    <Button
      disabled={saving}
      onClick={() => {
        setSaving(true);
        updateTodos(todos).finally(() => setSaving(false));
      }}
    >
      Save Changes
    </Button>
  );
}
