import {Button} from "@/components/ui/button";
import {updateTodos} from "@/lib/queries/template";
import React, {useState} from "react";
import {useAtomValue} from "jotai";
import {todoListAtom} from "@/state-management/jotai/atoms";

export function Save() {
  const todoList = useAtomValue(todoListAtom)
  const [saving, setSaving] = useState<boolean>(false);
  return (
    <Button
      disabled={saving}
      onClick={() => {
        setSaving(true);
        updateTodos(todoList).finally(() => setSaving(false));
      }}
    >
      Save Changes
    </Button>
  );
}
