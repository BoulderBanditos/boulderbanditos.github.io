using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.IO;
using UnityEngine.UI;

public class NextLevel : MonoBehaviour
{
    string InputScore = Timer.finalResult;
    bool isColliding = false;
    public int currentLevel;
    public int nextLevel;
    public Collider2D body;
    void OnTriggerEnter2D(Collider2D body)
    {
        if (isColliding) return;
        Debug.Log(InputScore);
        isColliding = true;
        StartCoroutine(sendTextToFile());
        SceneManager.LoadScene(nextLevel);
        return;
    }

    IEnumerator sendTextToFile()
    {
        bool successful = true;
        WWWForm form = new WWWForm();
        string origin = currentLevel.ToString();
        form.AddField("score", InputScore);
        form.AddField("IsOrigin", origin);
        WWW www = new WWW("http://localhost:9000/fromunity.php", form);

        yield return www;
        if (www.error != null)
        {
            Debug.Log("Didn't Work");
            successful = false;
        }
        else
        {
            Debug.Log(www.text);
            successful = true;
        }
    }

    void Update()
    {
        isColliding = false;
    }
}
